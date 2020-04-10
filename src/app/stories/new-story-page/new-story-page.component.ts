import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoryService} from '../../services/story.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFireAuth} from '@angular/fire/auth';
import {Story} from '../../services/story.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from '../../user/user.service';
import {Subscription} from 'rxjs';
import {ImageUploadService} from '../../shared/image-upload.service';


@Component({
  selector: 'app-new-story-page',
  templateUrl: './new-story-page.component.html',
  styleUrls: ['./new-story-page.component.scss']
})
export class NewStoryPageComponent {
  //
  // form: FormGroup;
  // loading = false;
  //
  // type: 'create' | 'update' = 'create';
  //
  // imageUrl: string;
  // imageAdded = false;
  // storyImage: File;
  // warnImage = true;
  // hasStories = false;
  // sub: Subscription;
  //
  // constructor(
  //   private fb: FormBuilder,
  //   private storyService: StoryService,
  //   public userService: UserService,
  //   private afStorage: AngularFireStorage,
  //   private afAuth: AngularFireAuth,
  //   private snackBar: MatSnackBar,
  //   private router: Router,
  //   private imageUploadService: ImageUploadService
  // ) { }
  //
  // ngOnInit(): void {
  //   this.form = this.fb.group({
  //     title: ['', Validators.required],
  //     story: ['', Validators.required],
  //   });
  //   this.sub = this.userService.getCurrentUser().subscribe(user => {
  //     if (user?.stories) {
  //       this.hasStories = (user.stories.length !== 0);
  //     } else {
  //       this.hasStories = false;
  //     }
  //   });
  // }
  //
  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
  //
  // get isCreate() {
  //   return this.type === 'create';
  // }
  //
  // get title() {
  //   return this.form.get('title');
  // }
  //
  // get story() {
  //   return this.form.get('story');
  // }
  //
  // async onSubmit() {
  //   if (this.warnImage !== undefined) {
  //     this.loading = true;
  //
  //
  //     const user = await this.afAuth.currentUser;
  //
  //     const storyToSubmit: Story = {
  //       title: this.title.value,
  //       story: this.story.value,
  //       author: user.displayName,
  //       image: this.imageUrl,
  //       reviewed: false,
  //       uid: user.uid,
  //     };
  //
  //     try {
  //       if (this.isCreate) {
  //         this.imageUploadService.uploadFile('story', storyToSubmit.title, this.storyImage).then(url => {
  //           storyToSubmit.image = url;
  //           this.storyService.createStory(storyToSubmit).then(res => {
  //             if (res == null) {
  //               this.snackBar.open('You already uploaded a story! If you want to upload another one contact caelinsutch@gmail.com', 'OK');
  //             } else {
  //               this.snackBar.open('Thank you for uploading your story! Our team will review it and let you when it\'s uploaded!');
  //               this.userService.updateUser({stories: [res.id]}).then(r => {
  //                 this.router.navigateByUrl('/');
  //               });
  //             }
  //           });
  //         });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //
  //     this.loading = false;
  //   } else {
  //     this.warnImage = true;
  //   }
  // }
  //
  // onFile($event) {
  //   this.warnImage = false;
  //   this.imageAdded = true;
  //   this.storyImage = $event;
  // }
}
