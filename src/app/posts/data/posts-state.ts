import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, pipe, switchMap, tap } from 'rxjs';
import { withLoading } from '../../shared/ngrx-utils';
import { PostsState } from '../model';
import { PostsHttpService } from './posts-http.service';

const initialState: PostsState = {
  posts: [],
};

export const PostsStore = signalStore(
  withLoading(),
  withState(initialState),
  withMethods((state, postsService = inject(PostsHttpService)) => ({
    loadPosts: rxMethod<void>(
      pipe(
        tap(() => state.setLoading(true)),
        switchMap(() => postsService.getAllPosts()),
        delay(1000),
        tap(() => state.setLoading(false)),
        tapResponse({
          next: (response) => {
            patchState(state, {
              posts: response,
            });
          },
          error: console.error,
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadPosts();
    },
  })
);
