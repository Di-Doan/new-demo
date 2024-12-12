export class ContactModel {
  name: string = '';
  email: string = '';
  title: string = '';
  note: string = '';
}

export class UserModel {
  _id: string = '';
  username: string = '';
  password: string = ''
  name: string = ''
  email: string = '';
  point: number = 0;
  role: string = 'user'
}

export class GiftModel {
  _id: string = '';
  img: string = '';
  name: string = '';
  start_date: string = '';
  end_date: string = '';
  point: number = 0;
  isHot: boolean = false
}
