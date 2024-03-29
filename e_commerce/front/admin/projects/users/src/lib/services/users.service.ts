import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import * as countriesLib from "i18n-iso-countries";


declare const require;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 

  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/v1/users');
  }

  getUser(_id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/v1/users/${_id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/api/v1/users/`,user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/api/v1/users/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/users/${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/users/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}
