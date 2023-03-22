export interface Entity {
  id: string;
}

export type Filter<T> = Record<keyof T, string>;

export type Sort<T> = {
  field: keyof T;
  order: "asc" | "desc";
};

export interface Pagination<T> {
  page: number;
  limit: number;
  filter: Filter<T>;
  sort: Sort<T>;
}
