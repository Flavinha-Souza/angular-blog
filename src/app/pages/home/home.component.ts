import { Component, OnInit } from '@angular/core';
import { PostService } from '../../data/post.service';
import { Post } from '../../data/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res: Post[]) => {
      this.posts = res;
      this.filteredPosts = res;
    });
  }

  onSearch(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.searchQuery = element.value;

    if (this.searchQuery.trim() === '') {
      this.filteredPosts = this.posts;
    } else {
      this.postService
        .searchPosts(this.searchQuery)
        .subscribe((res: Post[]) => {
          this.filteredPosts = res;
        });
    }
  }

  get otherPosts(): Post[] {
    return this.filteredPosts.slice(1);
  }
}
