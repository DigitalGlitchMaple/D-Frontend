import { ContentItem, ContentUpload } from './../Models/ContentItem';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {  Router } from '@angular/router';
import { ContentType } from '../Enums/content-type';
import { ContentItemService } from '../Services/content-item.service';


@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent implements OnInit {

  likeCounter: number = 0;
  @Input() contentItem: ContentItem;
  fileTitle: string;
  trustedUrl: SafeResourceUrl;
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  constructor(private contentItemService: ContentItemService, private _sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.trustedUrl = this._sanitizer.bypassSecurityTrustResourceUrl("/assets/" + this.contentItem.fileName);
    if(this.contentItem.fileName.length > 0){
      this.fileTitle = this.contentItem.fileName.split('/')[0];
    }

    if(this.contentItem.likes){
      this.likeCounter = this.contentItem.likes
    }
  }

  navigateToDetails(){
    this.router.navigate(['/post/', this.contentItem.id]);
  }

  increseLikeCounter(){
    this.likeCounter++;
    const itemUpload: ContentUpload = {
      id : this.contentItem.id,
      title: this.contentItem.title,
      likes: this.contentItem.likes +1

    }
    this.contentItemService.uploadContentItem(itemUpload).subscribe();
  }

}
