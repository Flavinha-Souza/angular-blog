import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dataFake } from './dataFake';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {}

  getPosts(): Observable<Post[]> {
    return of(dataFake as Post[]);
  }

  getPostById(id: string | null): Observable<Post | undefined> {
    return of((dataFake as Post[]).find((article) => article.id === id));
  }

  searchPosts(query: string): Observable<Post[]> {
    return of(
      (dataFake as Post[]).filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.tags?.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase()),
          ),
      ),
    );
  }
}
