import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/externalServices/service/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  cryptos = [
    {
      name: 'BTC Bitcoin',
      price: '$68,401.57',
      change: -1.05,
      logo: 'btc-logo.png',
    },
    // Add more cryptos here
  ];
  currency: string = 'EUR';
  bannerData: any = [];

  showChat = false;

  openChat() {
    this.showChat = true;
  }

  closeChat() {
    this.showChat = false;
  }
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((res) => {
      this.bannerData = res;
    });
  }
}
