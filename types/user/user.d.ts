declare namespace User {
  interface User {
    _id:string;
    userName:string;
    password:string;
    auth:string;
    menu:string;
    status:string;
    role:string;
    avater:string;
    salt:string;
  }
  type UserInfo = Pick<
    User,
    "auth" | "menu" | "role" | "avater" | "status" | "userName" | "_id"
  >;
  interface UserData {
    info: string;
    userData: UserInfo;
  }
  interface Info {
    data:UserData,
    code:number,
    message:string
  }
}
