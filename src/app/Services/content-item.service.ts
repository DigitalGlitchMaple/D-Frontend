import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ContentItem } from '../Models/ContentItem';

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

  addContentItem(form: FormGroup){
    
    console.log(form.value)
    return this.http.post<ContentItem>(this.contentItemUrl, form.value);
  }

}
