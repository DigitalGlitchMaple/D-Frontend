import { LogInComponent } from '../log-in/log-in.component';
import { ContentItem } from '../Models/ContentItem';
import { Component, OnInit } from '@angular/core';
import { ContentItemService } from '../Services/content-item.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  contentItems: ContentItem[];

  constructor(private contentItemService: ContentItemService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contentItemService.getContentItems().subscribe((data: ContentItem[]) => {this.contentItems = data});
  }

}
