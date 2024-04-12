// app.component.ts
import { Component, OnInit } from '@angular/core';
import { SupportedService } from '../services/supported.service';

@Component({
  selector: 'app-supported',
  templateUrl: './supported-fiat.component.html',
  styleUrls: ['./supported-fiat.component.scss'],
})
export class SupportedFiatComponent implements OnInit {
  /**
   *
   */
  constructor(private supportedService: SupportedService) {}
  leftList: any[] = [];

  rightList: any[] = [];

  ngOnInit(): void {
    this.supportedService.getAllFiat().subscribe((data) => {
      Object.entries(data).forEach(([key, value]) => {
        this.leftList.push(`${key}: ${value}`);
      });
      this.leftList.sort();
    });
  }

  saveData() {
    this.supportedService.saveSupported(this.rightList).subscribe();
  }

  moveItem(item: string, direction: 'left' | 'right') {
    if (direction === 'left') {
      this.rightList = this.rightList.filter((i) => i !== item);
      this.leftList.push(item);
      this.leftList.sort();
    } else {
      this.leftList = this.leftList.filter((i) => i !== item);
      this.rightList.push(item);
      this.rightList.sort();
    }
  }
}
