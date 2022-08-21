declare namespace Post {
  interface Post {
    _id: string;
    title: string;
    tags: Tag.Tag[];
    categories: Category.Category[];
    cover: string;
    abbrlink: number;
    date: string;
    top?: number;
    wordCount: number;
    url: string;
    toc: string;
    updateTime: string;
    intro: string;
  }

  type PostNoUrlToc = Omit<Post, "url" | "toc">;

  interface GetList {
    data: PostNoUrlToc[];
  }

  type GetListRes = GetList & Common.PaginUsual;

  interface toc {
    id?: number;
    root?: string;
    children?: toc[];
  }
  interface ReadPostRes {
    data: Post;
    postMd: string;
    toc: toc[];
  }
  interface GetLastestPostRes {
    data: Post[];
  }
}
