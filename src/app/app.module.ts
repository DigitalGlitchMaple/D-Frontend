import { CommentsService } from './Services/comments.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ContentItemComponent } from './content-item/content-item.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContentItemService } from './Services/content-item.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ContentItemComponent,
    LogInComponent,
    SignUpComponent,
    ItemDetailsComponent,
    AddItemComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    InfiniteScrollModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule

  ],
  providers: [
    ContentItemService,
    CommentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
