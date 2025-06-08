import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

const GTMTracker = () => {
  const location = useLocation();

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        path: location.pathname,
      },
    });
  }, [location.pathname]);

  return null;
};

export default GTMTracker;
