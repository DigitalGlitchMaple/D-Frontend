import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.currentUserData.subscribe()
  }
  signUp(userData: NgForm){
    this.user.changeData(userData.value);
    this.router.navigateByUrl('');
  }

}
