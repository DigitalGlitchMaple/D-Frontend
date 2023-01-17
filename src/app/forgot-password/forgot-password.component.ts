import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../Services/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword(email: NgForm){
    console.log(email);
  }

}
