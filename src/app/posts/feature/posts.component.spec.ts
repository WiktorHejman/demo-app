import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostsStore } from '../data';
import { Post } from '../model';
import { mockPosts } from '../utils';
import { PostsComponent } from './posts.component';

class MockPostsStore {
  isLoading = signal<boolean>(false);
  posts = signal<Post[]>(mockPosts);

  setLoading(value: boolean): void {
    this.isLoading.set(value);
  }
}

describe(PostsComponent.name, () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComponent],
    })
      .overrideComponent(PostsComponent, {
        add: {
          providers: [{ provide: PostsStore, useClass: MockPostsStore }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loading', () => {
    it('should display loader when isLoading is true', () => {
      component.store.setLoading(true);
      fixture.detectChanges();

      const loaderElement = fixture.debugElement.query(By.css('app-loader'));
      expect(loaderElement).toBeTruthy();
    });

    it('should hide loader when isLoading is false', () => {
      component.store.setLoading(false);
      fixture.detectChanges();

      const loaderElement = fixture.debugElement.query(By.css('app-loader'));
      expect(loaderElement).toBeFalsy();
    });
  });

  describe('activeId', () => {
    it('should display "None of the element has been selected" by default', () => {
      let paragraphElement = fixture.debugElement.query(
        By.css('p')
      ).nativeElement;

      expect(paragraphElement.textContent).toContain(
        'None of the element has been selected'
      );
    });

    it('should display activeId of selected value', () => {
      component.activeId.set(1);
      fixture.detectChanges();

      let paragraphElement = fixture.debugElement.query(
        By.css('p')
      ).nativeElement;

      expect(paragraphElement.textContent).toContain('Active id: 1');
    });

    it('should update activeId when post is clicked', () => {
      const postComponent = fixture.debugElement.query(By.css('app-post'));
      postComponent.nativeElement.querySelector('button').click();
      fixture.detectChanges();

      expect(component.activeId()).toEqual(
        postComponent.componentInstance.post().id
      );
    });
  });

  it('should render PostComponents based on the posts from the store', () => {
    const postComponents = fixture.debugElement.queryAll(By.css('app-post'));
    expect(postComponents.length).toBe(mockPosts.length);
    expect(postComponents[1].componentInstance.post().id).toBe(mockPosts[1].id);
  });
});
