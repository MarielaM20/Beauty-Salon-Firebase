import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-comment-message',
  templateUrl: './comment-message.component.html',
  styleUrls: ['./comment-message.component.scss']
})
export class CommentMessageComponent {

  constructor(private authService: AuthService) { }

  get comment() {
    const { firstName, lastName, email, comment } = this.authService.commentData!;
    return {
      firstName,
      lastName,
      email,
      comment
    };
  }

}
