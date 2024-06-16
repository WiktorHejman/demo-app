import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockPosts } from '../utils';
import { PostsHttpService } from './posts-http.service';
import { PostsStore } from './posts-state';

describe(PostsStore.name, () => {
  const postsHttpService = jasmine.createSpyObj<PostsHttpService>(
    PostsHttpService.name,
    ['getAllPosts']
  );

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        PostsStore,
        {
          provide: PostsHttpService,
          useValue: postsHttpService,
        },
      ],
    });

    postsHttpService.getAllPosts.and.returnValue(of(mockPosts));
  });

  it('should init store with empty array value', () => {
    const myStore = TestBed.inject(PostsStore);

    expect(myStore.posts()).toEqual([]);
  });

  it('should call service method when load posts', () => {
    const myStore = TestBed.inject(PostsStore);

    myStore.loadPosts();

    expect(postsHttpService.getAllPosts).toHaveBeenCalled();
  });

  it('should set isLoading with provided value', () => {
    const myStore = TestBed.inject(PostsStore);

    myStore.setLoading(false);
    expect(myStore.isLoading()).toBeFalse();

    myStore.setLoading(true);
    expect(myStore.isLoading()).toBeTrue();
  });

  it('should update store according to return value from service', fakeAsync(() => {
    const myStore = TestBed.inject(PostsStore);
    myStore.loadPosts();

    tick(1000);
    expect(myStore.posts()).toEqual(mockPosts);
  }));
});
