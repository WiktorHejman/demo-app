import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./posts/feature/posts.component').then((c) => c.PostsComponent),
  },
];
