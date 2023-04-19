import { Comment } from './../Models/Comment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentsUrl = "https://localhost:7241/Comments"

  constructor(private http: HttpClient) { }

  getComments(id: number) {
    return this.http.get<Comment[]>(this.commentsUrl+"/" +id);
  }
  postComment(comment: Comment){
    return this.http.post<Comment>(this.commentsUrl, comment);
  }
}
