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

interface ChatOption {
  text: string;
  next?: string;
  email?: string;
}

interface ChatFlow {
  [key: string]: ChatOption[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  amount: number = 0;
  fromCurrency: string = 'USD'; // default value, adjust as needed
  toCurrency: string = 'EUR'; // default value, adjust as needed
  currencies: string[] = ['USD', 'EUR']; // Example currency array, adjust as needed
  showConfirmation: boolean = false;
  showSupport: boolean = false;
  hideSupport: boolean = false;
  messages: { text: string; user: boolean }[] = [];
  currentOptions: ChatOption[] = [];

  initialOptions: ChatOption[] = [
    { text: 'Technical Support', next: 'technical' },
    { text: 'Billing Support', next: 'billing' },
    { text: 'General Inquiry', next: 'general' },
  ];

  optionFlows: ChatFlow = {
    technical: [
      { text: 'Issue with login', email: 'tech_login@example.com' },
      { text: 'Issue with transaction', email: 'tech_transaction@example.com' },
    ],
    billing: [
      { text: 'Billing error', email: 'billing_error@example.com' },
      { text: 'Refund request', email: 'billing_refund@example.com' },
    ],
    general: [
      { text: 'Company information', email: 'info@example.com' },
      { text: 'Partnerships', email: 'partnerships@example.com' },
    ],
  };

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
    this.resetChat();
  }

  resetChat(): void {
    this.messages = [{ text: 'How can we assist you today?', user: false }];
    this.currentOptions = this.initialOptions;
  }

  onAnimationEnd() {
    if (!this.showSupport) {
      this.hideSupport = true;
    } else {
      this.hideSupport = false;
    }
  }

  showSupportModal() {
    this.showSupport = true;
  }

  hideSupportModal() {
    this.showSupport = false;
    this.resetChat(); // Reset chat to initial state
  }

  selectOption(option: ChatOption) {
    this.messages.push({ text: option.text, user: true });

    if (option.email) {
      this.messages.push({
        text: `Please contact us at ${option.email}`,
        user: false,
      });
      this.currentOptions = [];
    } else if (option.next) {
      this.currentOptions = this.optionFlows[option.next] || [];
      this.messages.push({ text: 'Please select an option:', user: false });
    }
  }
}
