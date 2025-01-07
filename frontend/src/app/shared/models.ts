export class ContactModel {
  _id: string = "";
  name: string = "";
  email: string = "";
  title: string = "";
  note: string = "";
}

export class SubscriptionModel {
  _id: string = "";
  userEmail: string = "";
}

export class UserModel {
  _id: string = "";
  username: string = "";
  password: string = "";
  name: string = "";
  email: string = "";
  point: number = 0;
  role: string = "user";
  roleName: string = "Người dùng";
  constructor(user: UserModel = {} as UserModel) {
    if ( user.role === "superAdmin") {
      user.roleName = "Quản trị viên siêu cấp"
    } else {
      user.roleName = user.role === "admin" ? "Quản trị viên" : "Người dùng";
    }
    
    Object.assign(this, user);
    return this;
  }
}

export class GiftModel {
  _id: string = "";
  img: string = "";
  name: string = "";
  start_date: string = "";
  end_date: string = "";
  point: number = 0;
  isHot: boolean = false;
}

export interface IGift{
  _id: string;
  img: string;
  name: string;
  start_date: string;
  end_date: string;
  point: number;
  isHot: boolean;
}
