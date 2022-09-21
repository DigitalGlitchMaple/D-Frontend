import { ContentItem } from './../Models/ContentItem';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { ContentType } from '../Enums/content-type';


@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent implements OnInit {

  @Input() contentItem: ContentItem;
  fileTitle: string;
  trustedUrl: SafeResourceUrl;
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  constructor(private _sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.trustedUrl = this._sanitizer.bypassSecurityTrustResourceUrl("/assets/" + this.contentItem.fileName);
    if(this.contentItem.fileName.length > 0){
      this.fileTitle = this.contentItem.fileName.split('/')[0];
    }
  }

  navigateToDetails(){
    this.router.navigate(['/post/', this.contentItem.id]);
  }

}
