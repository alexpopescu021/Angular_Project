import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @ViewChild('routerOutlet') routerOutlet: ElementRef | undefined;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
}
