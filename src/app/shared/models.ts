export class ContactModel {
  name: string = '';
  email: string = '';
  title: string = '';
  note: string = '';
}

export class UserModel {
  username: string = '';
  name: string = ''
  password: string = '';
  email: string = '';
  point: number = 0;
}

export interface GiftModel {
  img: string ;
  name: string ;
  start_date: string ;
  end_date: string ;
  point: number;
  isHot: boolean
}
