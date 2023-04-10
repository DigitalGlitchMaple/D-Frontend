import { ContentType } from './../Enums/content-type';
import { Tag } from './Tag';

export class ContentItem{
   id: string;
   title: string;
   createdDate: Date;
   contentType: ContentType
   fileName: string;
   likes: number;
   tags: Tag[];
}

export class ContentUpload{
  id: string;
  title: string;
  likes: number;
}
