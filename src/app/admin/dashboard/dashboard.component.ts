import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {StoryService} from '../../services/story.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private storyService: StoryService,
  ) {
  }

  ngOnInit(): void {
  }

}
