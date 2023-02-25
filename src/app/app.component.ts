import { Component } from '@angular/core';
import { User } from './Models/User';
import { UserService } from './Services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FunReel';
  opened = false;
  isUser: boolean;

constructor( private userService: UserService){}

ngOnInit(): void {
  this.userService.user.subscribe(user => {
    if(user.authdata){
      this.isUser = true;
    }
    else{
      this.isUser = false;
    }
  })
}

logout(){
  this.userService.logout();
}

}
