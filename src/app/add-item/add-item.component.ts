import { ContentType } from './../Enums/content-type';
import { Component, OnInit } from '@angular/core';
import { ContentItemService } from '../Services/content-item.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum Tags {
Funny = '1'
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  form: FormGroup;
  contentType = ContentType;
  tags = Tags;
  fileName: string = "Select File";

  constructor(private contentItemService: ContentItemService) {
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      contentType: new FormControl(null, [Validators.required]),
      file: new FormControl('', [Validators.required]),
      tags: new FormControl(null, [Validators.required])
    });
  }

  submit() {
    this.contentItemService.addContentItem(this.form).subscribe();
  }

  removeSelectOption(e){
    console.log(e.target.value.null)
  }

  getFile(e) {
    var name = e.target.files[0].name;
    var extension = name.split('.').pop();

    let extensionAllowed = {"png":true,"jpeg":true,"jpg":true,"mp4":true, "webm": true};
    if (e.target.files[0].size / 1024 / 1024 > 20) {
      alert("File size should be less than 20MB")
      return;
    }
    if (extensionAllowed) {
      if (!extensionAllowed[extension]) {
        alert("Please upload " + Object.keys(extensionAllowed) + " file.")
        return;
      }
    }
    this.form.controls["file"].setValue(e.target.files[0]);

    if(name.length < 20)
    {
      this.fileName = name;
    }
    else {
      this.fileName = name.slice(0,20) + "... ." + extension;
    }
  }


  }


