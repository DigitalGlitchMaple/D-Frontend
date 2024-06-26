import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ContentItem, ContentUpload } from '../Models/ContentItem';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContentItemService {

  contentItemUrl = "https://localhost:7241/ContentItem"

  constructor(private http: HttpClient) { }

  getContentItems() {
    return this.http.get<ContentItem[]>(this.contentItemUrl);
  }

  getContentItem(id: number) {
    return this.http.get<ContentItem>(this.contentItemUrl+"/" +id);
  }

  addContentItem(form: FormData){
    return this.http.post<any>(this.contentItemUrl + '/additem', form);
  }

  uploadContentItem(item: ContentUpload) {
    return this.http.put<ContentItem>(this.contentItemUrl, item);
  }
}
