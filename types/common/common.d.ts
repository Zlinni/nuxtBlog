declare namespace Common {
  export type PaginUsual = {
    totalPage: number;
    count?: number;
  };
  export type UsualPaginParams = {
    page?: number;
    pageSize?: number;
  };
}
