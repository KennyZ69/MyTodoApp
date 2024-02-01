export interface Item {
  id: any,
  title: string,
  date: string,
  description: string
}

export default class ListItem {

  constructor(
    private _id: any = 1,
    private _title: string = '',
    private _date: string = '',
    private _description: string = '',
  ){}

  get id(): any{
    return this._id
  }
  set id(id){
    this._id = id
  }

  get title(): string{
    return this._title
  }
  set title(title){
    this._title = title
  }

  get date(): string{
    return this._date
  }
  set date(date){
    this._date = date
  }

  get description(): string{
    return this._description
  }
  set description(description){
    this._description = description
  }
}