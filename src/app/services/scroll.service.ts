import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private renderer: Renderer2;

  constructor(private router: Router, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkContentLargerThanViewport();
      });
  }

  checkContentLargerThanViewport() {
    setTimeout(() => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      console.log(
        `Content height: ${contentHeight}, Viewport height: ${viewportHeight}`
      );

      if (contentHeight <= viewportHeight) {
        this.renderer.addClass(document.body, 'no-scroll');
        console.log('Adding no-scroll class');
      } else {
        this.renderer.removeClass(document.body, 'no-scroll');
        console.log('Removing no-scroll class');
      }
    }, 0);
  }
}
