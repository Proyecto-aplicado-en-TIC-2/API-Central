export class User {
  private Id: string;
  private TypeUser: string;
  private FirstName: string;
  private LastName: string;
  private Email: string;
  private PhoneNumber: string;
  private IdUPB: number;

  constructor(
    Id: string,
    TypeUser: string,
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    IdUPB: number,
  ) {
    this.Id = Id;
    this.TypeUser = TypeUser;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.PhoneNumber = PhoneNumber;
    this.IdUPB = IdUPB;
  }
}
