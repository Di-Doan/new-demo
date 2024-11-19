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
  start_date: string;
  end_date: string;
  point: number = 0;
  isHot: boolean = false

  constructor(img: string = '', name: string = '', start_date: string = '', end_date: string = '', point: number = 0, isHot: boolean = false) {
    this.img = img;
    this.name = name;
    this.start_date = start_date;
    this.end_date = end_date;
    this.point = point;
    this.isHot = isHot;
  }
}
