import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  userUrl = "https://localhost:7241/User";


  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + window.btoa(username + ':' + password)
      })
    };
      return this.http.post<any>(this.userUrl + '/authenticate', { username, password }, httpOptions)
          .pipe(map(user => {
              user.authdata = window.btoa(username + ':' + password);
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          }));
  }

  logout() {
      localStorage.removeItem('user');
      this.userSubject.next({} as User);
      this.router.navigate(['/']);
  }

  signup(user: User){
    user.authdata = window.btoa(user.username + ':' + user.password);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
    return this.http.post<User>(this.userUrl, user);
  }
}
