import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'coins-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  searchControl = new FormControl();
  symbols: string[] = [];
  isDropdownOpen: boolean = false;

  constructor(private dataService: TransactionService) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;

    // Fetch data and populate symbols only when the dropdown is open
    if (this.isDropdownOpen) {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.dataService.GetAllCoins().subscribe((response) => {
      const data = response.Data;

      // Extract symbols from the data and populate the dropdown options
      this.symbols = Object.keys(data).map((key) => data[key].symbol);
      console.log(this.symbols);
    });
  }
}
