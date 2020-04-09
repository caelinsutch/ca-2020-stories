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


@Component({
  selector: 'app-new-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading = false;

  type: 'create' | 'update' = 'create';

  imageUrl: string;
  warnImage = true;
  hasStories = false;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    public userService: UserService,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      story: ['', Validators.required],
    });

    this.sub = this.userService.getCurrentUser().subscribe(user => {
      this.hasStories = (user.stories.length !== 0);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get isCreate() {
    return this.type === 'create';
  }

  get isUpdate() {
    return this.type === 'update';
  }

  get title() {
    return this.form.get('title');
  }

  get story() {
    return this.form.get('story');
  }

  async onSubmit() {
    if (this.warnImage !== undefined) {
      this.loading = true;


      const user = await this.afAuth.currentUser;

      const storyToSubmit: Story = {
        title: this.title.value,
        story: this.story.value,
        author: user.displayName,
        image: this.imageUrl,
        reviewed: false,
        uid: user.uid,
      };

      try {
        if (this.isCreate) {
          const res = await this.storyService.createStory(storyToSubmit);
          if (res == null) {
            this.snackBar.open('You already uploaded a story! If you want to upload another one contact caelinsutch@gmail.com', 'OK');
          } else {
            this.snackBar.open('Thank you for uploading your story! Our team will review it and let you when it\'s uploaded!');
            await this.userService.updateUser({stories: [res.id]});
            await this.router.navigateByUrl('/');
          }
        }
      } catch (err) {
        console.log(err);
      }

      this.loading = false;
    } else {
      this.warnImage = true;
    }
  }

  onUpload($event) {
    this.warnImage = false;
    this.imageUrl = $event;
  }
}
