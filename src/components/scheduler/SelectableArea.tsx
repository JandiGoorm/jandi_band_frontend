/* eslint-disable react-refresh/only-export-components */
import { Slot } from "@radix-ui/react-slot";
import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
} from "react";

const SelectableAreaContext = createContext<{
  isDragging: boolean;
  isSelecting: boolean;
  onStartDrag: (id: string, isSelected: boolean) => void;
  onSelect: (id: string) => void;
  onEndDrag: () => void;
  addItem: (id: string, isSelected: boolean) => void;
  toggle: (isSelecting: boolean) => void;
  selectedItems: Map<string, boolean>;
  setSelectedItems: (items: Map<string, boolean>) => void;
  disabled?: boolean;
  setIsDragging: (val: boolean) => void;
  setIsSelecting: (val: boolean) => void;
}>({
  isDragging: false,
  isSelecting: false,
  onStartDrag: () => {},
  onSelect: () => {},
  onEndDrag: () => {},
  addItem: () => {},
  toggle: () => {},
  selectedItems: new Map(),
  disabled: false,
  setSelectedItems: () => {},
  setIsDragging: () => {},
  setIsSelecting: () => {},
});

export const useSelectableAreaContext = () => {
  const context = useContext(SelectableAreaContext);
  if (!context) {
    throw new Error(
      "useSelectableAreaContext must be used within a SelectableArea"
    );
  }
  return context;
};

interface SelectableAreaProps {
  children: React.ReactNode;
  onChange?: (selectedItems: Map<string, boolean>) => void;
  disabled?: boolean;
}

// 여기가 메인
const SelectableArea = ({
  children,
  onChange,
  disabled,
}: SelectableAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Map<string, boolean>>(
    new Map()
  );

  const onSelect = useCallback(
    (id: string) => {
      setSelectedItems((prev) => {
        if (prev.get(id) === !isSelecting) return prev;
        const newMap = new Map(prev);
        newMap.set(id, !isSelecting);
        return newMap;
      });
    },
    [isSelecting]
  );

  const onStartDrag = useCallback(
    (id: string, isSelected: boolean) => {
      if (disabled) return;
      setIsDragging(true);
      setIsSelecting(isSelected);
      onSelect(id);
    },
    [disabled, onSelect]
  );

  const onEndDrag = useCallback(() => {
    setIsDragging(false);
    onChange?.(selectedItems);
  }, [onChange, selectedItems]);

  const addItem = useCallback((id: string, isSelected: boolean) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, isSelected);
      return newMap;
    });
  }, []);

  const toggle = useCallback((isSelecting: boolean) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      newMap.forEach((_, key) => {
        newMap.set(key, isSelecting);
      });
      return newMap;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      isDragging,
      isSelecting,
      onStartDrag,
      onSelect,
      onEndDrag,
      addItem,
      toggle,
      selectedItems,
      setSelectedItems,
      disabled,
      setIsDragging,
      setIsSelecting,
    }),
    [
      isDragging,
      isSelecting,
      onStartDrag,
      onSelect,
      onEndDrag,
      addItem,
      toggle,
      selectedItems,
      setSelectedItems,
      disabled,
      setIsDragging,
      setIsSelecting,
    ]
  );

  return (
    <SelectableAreaContext.Provider value={contextValue}>
      {children}
    </SelectableAreaContext.Provider>
  );
};

interface SelectableAreaContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// const SelectableAreaContainer = ({
//   children,
//   ...props
// }: SelectableAreaContainerProps) => {
//   const { onEndDrag } = useSelectableAreaContext();

//   return (
//     <div {...props} onMouseUp={onEndDrag} onMouseLeave={onEndDrag}>
//       {children}
//     </div>
//   );
// };

const SelectableAreaContainer = ({
  children,
  ...props
}: SelectableAreaContainerProps) => {
  const {
    onEndDrag,
    onSelect,
    setIsDragging,
    setIsSelecting,
    selectedItems,
    disabled,
  } = useSelectableAreaContext();

  useEffect(() => {
    if (disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const id = el?.getAttribute("data-id");
      if (id) {
        e.preventDefault(); // 스크롤 방지
        const isSelected = selectedItems.get(id) ?? false;
        setIsDragging(true);
        setIsSelecting(isSelected);
        onSelect(id);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const id = el?.getAttribute("data-id");
      if (id) {
        onSelect(id);
      }
    };

    const handleTouchEnd = () => {
      onEndDrag();
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSelect, onEndDrag, setIsDragging, setIsSelecting, selectedItems]);

  return (
    <div {...props} onMouseUp={onEndDrag} onMouseLeave={onEndDrag}>
      {children}
    </div>
  );
};
//----------------------------------------------------------------

interface SelectableAreaItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children:
    | React.ReactNode
    | ((props: { isSelected: boolean }) => React.ReactNode);
  id: string;
  initialSelected?: boolean;
}

const SelectableAreaItem = ({
  children,
  id,
  initialSelected = false,
  ...props
}: SelectableAreaItemProps) => {
  const { isDragging, onStartDrag, onSelect, selectedItems, addItem } =
    useSelectableAreaContext();

  const handleMouseDown = useCallback(() => {
    onStartDrag(id, selectedItems.get(id) ?? initialSelected);
  }, [onStartDrag, id, selectedItems, initialSelected]);

  const handleMouseEnter = useCallback(() => {
    if (!isDragging) return;
    onSelect(id);
  }, [isDragging, onSelect, id]);

  useLayoutEffect(() => {
    addItem(id, initialSelected);
  }, [addItem, id, initialSelected]);

  return (
    <Slot
      {...props}
      data-id={id}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    >
      {typeof children === "function"
        ? children({ isSelected: selectedItems.get(id) ?? initialSelected })
        : children}
    </Slot>
  );
};

interface SelectableAreaControllerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children:
    | React.ReactNode
    | ((props: {
        toggle: (isSelecting: boolean) => void;
        disabled?: boolean;
      }) => React.ReactNode);
}

const SelectableAreaController = ({
  children,
  ...props
}: SelectableAreaControllerProps) => {
  const { toggle, disabled } = useSelectableAreaContext();

  return (
    <Slot {...props}>
      {typeof children === "function"
        ? children({ toggle, disabled })
        : children}
    </Slot>
  );
};

export {
  SelectableArea,
  SelectableAreaContainer,
  SelectableAreaController,
  SelectableAreaItem,
};
