import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
  <div class="w-full h-full flex justify-center items-center">
    <div class="loader"></div>
  </div>`,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {}
