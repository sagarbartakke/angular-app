import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { post } from '../models/post';
import { PostService } from '../services/post.service';
import { User } from '../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() term: String;
  users$: User[];
  user$: Object;
  q: String;
  errorMessage: String;
  message: String;

  constructor(private userService: UserService,
    private postService: PostService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    let userId: String;
    this.route.params.subscribe(params => userId = params.id);
    if (userId != undefined) {
      this.getUser(userId);
    } else {
      this.getUsers();
    }
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(term => this.q = term)
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users$ = data,
      error => this.errorMessage = error
    )
  }

  getUser(id) {
    this.userService.getUser(id).subscribe(
      data => {
        this.user$ = data
      }
    )
  }

  openAddPostDialog(userId: number): void {
    let userPost: post;
    userPost = new post();
    userPost.userId = userId;
    const dialogRef = this.dialog.open(DialogAddPost, {
      data: userPost,
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(userPost => {
      this.postService.addUserPost(userPost).subscribe(
        response => {
          if (response.userId != null) {
            this.snackBar.open('Post Added Successfully !!!', 'Close', {
              duration: 2000
            });
          } else {

          }
        }
      )
    });
  }



}

@Component({
  selector: 'dialog-add-post',
  templateUrl: '../posts/dialog-add-post.html',
  styleUrls: ['../posts/dialog-add-post.css']
})
export class DialogAddPost {
  constructor(
    public dialogRef: MatDialogRef<DialogAddPost>,
    @Inject(MAT_DIALOG_DATA) public data: post) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
