import { Component, inject, signal } from '@angular/core';
import { LoaderComponent } from '../../shared/loader';
import { PostsStore } from '../data';
import { PostComponent } from '../ui';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent, LoaderComponent],
  providers: [PostsStore],
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  readonly store = inject(PostsStore);
  readonly activeId = signal<number | undefined>(undefined);
}
