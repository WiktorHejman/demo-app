import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Post } from '../../model';
import { defaultPostKeyIndex, postKeys } from '../../utils';
import { PostComponent } from './post.component';

describe(PostComponent.name, () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: 'Test title',
    body: 'Test body',
  };
  const activeClassList = ['bg-pink-700', 'border-pink-700', 'text-white'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('post', mockPost);
    component.activeId.set(undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isActive', () => {
    it('should set to false by default', () => {
      expect(component.isActive()).toBeFalse();
    });

    it('should set to true if id matches', () => {
      component.activeId.set(mockPost.id);
      expect(component.isActive()).toBeTrue();
    });

    it('should have active style classes when true', () => {
      component.activeId.set(mockPost.id);
      fixture.detectChanges();

      const element = fixture.debugElement.query(
        By.css('button')
      ).nativeElement;

      for (let activeClass of activeClassList) {
        expect(element.classList).toContain(activeClass);
      }
    });
  });

  it('should compute ariaLabel correctly with post title', () => {
    expect(component.ariaLabel()).toBe(
      `Shuffle the fields for post ${mockPost.title}`
    );
  });

  describe('activePropertyValue', () => {
    it('should compute to post.title by default', () => {
      expect(component.activePropertyValue()).toBe(mockPost.title);
    });

    it('should not compute to different value than default if isActive is false', () => {
      component.activePropertyIndex.set(1);
      expect(component.activePropertyValue()).toBe(
        mockPost[postKeys[defaultPostKeyIndex]]
      );
    });

    it('should set according to activePropertyIndex if isActive is true', () => {
      component.activeId.set(mockPost.id);
      component.activePropertyIndex.set(1);
      expect(component.activePropertyValue()).toBe(mockPost[postKeys[1]]);
    });
  });

  describe('onClick', () => {
    it('should update activeId and activePropertyIndex', () => {
      spyOn(component, 'onClick').and.callThrough();

      component.onClick();
      expect(component.onClick).toHaveBeenCalled();
      expect(component.activeId()).toBe(mockPost.id);
      expect(component.activePropertyIndex()).toBe(
        (defaultPostKeyIndex + 1) % postKeys.length
      );

      component.onClick();
      expect(component.activePropertyIndex()).toBe(
        (defaultPostKeyIndex + 2) % postKeys.length
      );
    });
  });
});
