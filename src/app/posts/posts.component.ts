import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$: Object;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    let userId:String;
    this.route.params.subscribe(params => userId = params.userId);
    if (userId != undefined) {
      this.getUserPosts(userId);
    } else {
      this.getPosts();
    }
  }

  ngOnInit() {
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      data => this.posts$ = data
    )
  }

  getUserPosts(userId) {
      this.postService.getUserPosts(userId).subscribe(
        data => this.posts$ = data
      )
  }
}
