/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor() {}
  login() {
    this._userIsAuthenticated = true;
  }
  logout() {
    this._userIsAuthenticated = false;
  }
}
