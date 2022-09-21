import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user-service.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  userData: any;
  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user.currentUserData.subscribe(userData => (this.userData = userData));
  }

  changeData(event) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  login(data) {
    this.user.changeData(data);
    this.router.navigateByUrl('');
  }

}
