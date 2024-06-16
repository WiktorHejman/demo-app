import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Post } from '../model';

@Injectable({ providedIn: 'root' })
export class PostsHttpService {
  #http = inject(HttpClient);

  getAllPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${environment.apiBaseUrl}/posts`);
  }
}
