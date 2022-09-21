import { Comment } from './../Models/Comment';
import { ContentItem } from './../Models/ContentItem';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentItemService } from '../Services/content-item.service';
import { Params, Route, Router, ActivatedRoute } from '@angular/router';
import { CommentsService } from '../Services/comments.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  @Input() contentItemId: number;
  fileTitle: string;
  trustedUrl: SafeResourceUrl;
  contentItem : ContentItem;
  comments: Comment[];

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  constructor(private _sanitizer: DomSanitizer,private contentItemService: ContentItemService, private commentsService: CommentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.contentItemId = params['id'])

    this.contentItemService.getContentItem(this.contentItemId).subscribe((data: ContentItem) => {this.contentItem = data});
    this.commentsService.getComments(this.contentItemId).subscribe((data: Comment[]) => {this.comments = data});


  }
  ngAfterViewInit(): void{
    this.trustedUrl = this._sanitizer.bypassSecurityTrustResourceUrl("/assets/" + this.contentItem.fileName);

    if(this.contentItem.fileName.length > 0){
      this.fileTitle = this.contentItem.fileName.split('/')[0];
    }
  }

}
