import { Comment } from './../Models/Comment';
import { ContentItem } from './../Models/ContentItem';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentItemService } from '../Services/content-item.service';
import { Params, Route, Router, ActivatedRoute } from '@angular/router';
import { CommentsService } from '../Services/comments.service';
import { MatInput } from '@angular/material/input';
import { UserService } from '../Services/user-service.service';

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
  newComment: string;
  isUser: Boolean;

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  constructor(private _sanitizer: DomSanitizer, private userService: UserService,private contentItemService: ContentItemService, private commentsService: CommentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => this.contentItemId = params['id'])

    this.contentItemService.getContentItem(this.contentItemId).subscribe((data: ContentItem) => {this.contentItem = data});
    this.commentsService.getComments(this.contentItemId).subscribe((data: Comment[]) => {this.comments = data; this.comments.sort((a,b) => a.createdDate!.getTime() - b.createdDate!.getTime())});

    this.userService.user.subscribe(user => {
      if(user.authdata){
        this.isUser = true;
      }
      else{
        this.isUser = false;
      }
    })


  }

  addComment(){
    console.log(this.newComment)
    const comment:  Comment = {
      text : this.newComment,
      contentItemId: this.contentItem.id
    };

    this.commentsService.postComment(comment).subscribe();
    this.comments.unshift(comment);
    this.newComment = '';
  }
}
