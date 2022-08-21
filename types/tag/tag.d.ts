declare namespace Tag {
  interface Tag {
    _id: string;
    name: string;
    color: string;
    count: number;
    createTime: string;
  }

  interface GetTagsRes {
    data: Tag[];
    totalPage: number;
  }

  interface GetTagsList {
    data: Post.Post[];
  }

  type GetTagsListRes = Common.PaginUsual & GetTagsList;
}
