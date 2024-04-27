import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: LoginService
  ) {
    setTheme('bs5'); // or 'bs4'
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 100) {
      var element = document.getElementById('navbar-top');
      if (element) {
        element.classList.remove('navbar-transparent');
        element.classList.add('bg-danger');
      }
    } else {
      var element = document.getElementById('navbar-top');
      if (element) {
        element.classList.add('navbar-transparent');
        element.classList.remove('bg-danger');
      }
    }
  }
  ngOnInit(): void {
    this.renderer.setAttribute(this.document.body, 'class', 'theme-dark');
    this.authService.autoLogin();
  }
}
