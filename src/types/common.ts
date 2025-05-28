export type Nullable<T> = T | null;

export interface PagiNationResponse<T> {
  content: T[];
  pageInfo: PageInfo;
}

export interface PageInfo {
  empty: boolean;
  first: boolean;
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
