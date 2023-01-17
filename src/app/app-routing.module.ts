import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forget-password', component: ForgotPasswordComponent},
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'post/:id', component: ItemDetailsComponent },
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
