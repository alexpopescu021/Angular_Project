import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'coins-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  searchControl = new FormControl();
  symbols = new FormControl('');
  symbolsList: string[] = [];
  isDropdownOpen: boolean = false;

  constructor(private dataService: TransactionService) {}
  ngOnInit(): void {
    this.fetchData();
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;

    // Fetch data and populate symbols only when the dropdown is open
    if (this.isDropdownOpen) {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.dataService.GetAllCoins().subscribe((response) => {
      const data = response.Data;

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const symbol = data[key].symbol;
          this.symbolsList.push(symbol);
        }
      }
      // Extract symbols from the data and populate the dropdown options
      //this.symbolsList = Object.keys(data).map((key) => data[key].Object);
      console.log(this.symbolsList);
    });
  }
}
