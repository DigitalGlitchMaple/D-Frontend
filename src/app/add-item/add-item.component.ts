import { UserService } from './../Services/user-service.service';
import { ContentType } from './../Enums/content-type';
import { Component, OnInit } from '@angular/core';
import { ContentItemService } from '../Services/content-item.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{
  form: FormGroup;
  contentType = ContentType;
  tags: Array<any> = [
    { name: 'Funny', selected: true, id: 1},
    { name: 'Awesome', selected: false, id: 2},
    { name: 'Happy', selected: false, id: 3},
    { name: 'Sad', selected: false, id: 4}
  ];
  fileName: string = "Select File";

  constructor(private contentItemService: ContentItemService, private userService: UserService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      contentType: [null, Validators.required],
      file:  [null, Validators.required],
      tagIds: this.fb.array([],this.minSelectedCheckboxes(1)),
      userId: null
    });
    this.tags.forEach((tag) => this.tagIds.push(new FormControl(tag.selected)));
  }

// Gets value of tagIds inside FormGroup so you can iterate over it with "forEach"
  get tagIds() {
    return this.form.controls.tagIds as FormArray;
  }

  submit() {
    // Sending tags to backend as an array
    const selectedTags = this.form.value.tagIds.map((checked: boolean, i: number) => 
    checked ?  this.tags[i].id : null).filter(checkedTags => checkedTags !== null);
     
    console.log(selectedTags)

    //this.form.controls["userId"].setValue(this.userService.userValue.id);
    const contentItemData = new FormData();
    contentItemData.append('file', this.form.get('file')?.value);
    contentItemData.append('title', this.form.get('title')?.value);
    contentItemData.append('contentType', this.form.get('contentType')?.value);
    for (let i = 0; i < selectedTags.length; i++) {
      contentItemData.append('tagIds[]', selectedTags[i]);
    }    
    contentItemData.append('userId', this.userService.userValue.id.toString());
    this.contentItemService.addContentItem(contentItemData).subscribe();
    this.router.navigate(['/']);
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

  // Validator for tagIds - requires minimum 1 selected element in checkbox array
  minSelectedCheckboxes(min = 1) {
    const validator: Validators = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  }


