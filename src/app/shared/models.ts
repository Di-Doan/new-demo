export class ContactModel {
  name: string = '';
  email: string = '';
  title: string = '';
  note: string = '';
}

export class UserModel {
  username: string = '';
  password: string = '';
  point: number = 0;
}

export class GiftModel {
  img: string = '';
  name: string = '';
  start_date: Date | undefined;
  end_date: Date | undefined;
  point: number = 0;
  isHot: boolean = false
}
