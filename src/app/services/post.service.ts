import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }

  getUserPosts(userId) {
    return this.http.get("https://jsonplaceholder.typicode.com/posts?userId=" + userId);
  }

  addUserPost(userPost:post) {
    return this.http.post<post>("https://jsonplaceholder.typicode.com/posts", userPost);
  }
}
