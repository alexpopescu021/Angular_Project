import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public isContentLargerThanViewport: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkContentLargerThanViewport();
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkContentLargerThanViewport();
      }
    });
    this.checkContentLargerThanViewport(); // Check content size when component initializes
  }

  private checkContentLargerThanViewport() {
    setTimeout(() => {
      const bodyHeight = document.body.clientHeight;
      const viewportHeight = window.innerHeight;

      this.isContentLargerThanViewport = bodyHeight > viewportHeight;
    });
  }
}
