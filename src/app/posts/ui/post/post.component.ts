import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { Post } from '../../model';
import { defaultPostKeyIndex, postKeys } from '../../utils';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgClass],
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  post = input.required<Post>();
  activeId = model.required<number | undefined>();

  readonly isActive = computed(() => this.post().id === this.activeId());
  readonly ariaLabel = computed(
    () => `Shuffle the fields for post ${this.post().title}`
  );
  readonly activePropertyValue = computed(() => {
    const index = this.isActive()
      ? this.activePropertyIndex()
      : defaultPostKeyIndex;
    return this.post()[postKeys[index]];
  });
  activePropertyIndex = signal(defaultPostKeyIndex);

  onClick(): void {
    if (!this.isActive()) {
      this.activePropertyIndex.set(defaultPostKeyIndex);
      this.activeId.set(this.post().id);
    }
    this.#shuffleProperty();
  }

  #shuffleProperty(): void {
    this.activePropertyIndex.set(
      (this.activePropertyIndex() + 1) % postKeys.length
    );
  }
}
