export class UserDto {
  constructor(public username: string, private _password: string) {}

  get password() {
    return this._password;
  }
}
