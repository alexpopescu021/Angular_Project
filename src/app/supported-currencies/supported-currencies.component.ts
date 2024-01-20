// app.component.ts
import { Component, OnInit } from '@angular/core';
import { SupportedService } from '../services/supported.service';

@Component({
  selector: 'app-supported',
  templateUrl: './supported-currencies.component.html',
  styleUrls: ['./supported-currencies.component.scss'],
})
export class SupportedCurrenciesComponent implements OnInit {
  /**
   *
   */
  constructor(private supportedService: SupportedService) {}
  leftList: any[] = [];

  rightList: any[] = [];

  ngOnInit(): void {
    this.supportedService.loadAllFiat().subscribe((data: string[]) => {
      this.leftList.push(...data);
      this.leftList.sort();
    });
  }
  saveData() {
    this.supportedService.saveSupported(this.rightList);
    debugger;
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
