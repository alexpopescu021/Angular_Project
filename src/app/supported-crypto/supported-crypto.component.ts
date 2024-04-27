// app.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FilterItemsPipe } from '../pipes/filterItems/filter-items.pipe';
import { CurrencyService } from '../services/currency.service';
import { SnackbarService } from '../services/snackbar.service';
import { SupportedService } from '../services/supported.service';

@Component({
  selector: 'app-supported',
  templateUrl: './supported-crypto.component.html',
  styleUrls: ['./supported-crypto.component.scss'],
})
export class SupportedCryptoComponent implements OnInit {
  /**
   *
   */
  constructor(
    private supportedService: SupportedService,
    private currenciesService: CurrencyService,
    private snackbarService: SnackbarService,
    private filterPipe: FilterItemsPipe,
    private cdr: ChangeDetectorRef
  ) {}
  leftList: any[] = [];
  filteredLeftList: any[] = []; // Array to hold the filtered items
  searchText: string = ''; // Input field value

  searchTextRight: string = ''; // Input field value
  filteredRightList: any[] = []; // Array to hold the filtered items
  rightList: any[] = [];

  ngOnInit(): void {
    this.loadCryptoContainer();
  }

  public loadCryptoContainer() {
    this.supportedService.getAllCrypto().subscribe((data) => {
      Object.entries(data).forEach(([key, value]) => {
        this.leftList.push(`${key}: ${value}`);
      });
      this.leftList.sort();
      this.filteredLeftList = this.leftList; // Initially, both lists are the same
    });

    this.currenciesService.getSupportedCrypto().subscribe((data) => {
      Object.entries(data).forEach(([, value]) => {
        const currencyValue = value as { currencyCode: string };
        if (currencyValue.currencyCode) {
          this.rightList.push(currencyValue.currencyCode);
        }
      });
      this.rightList.sort();
      this.filteredRightList = this.rightList; // Initially, both lists are the same
    });
  }

  applyFilter() {
    this.filteredLeftList = this.filterPipe.transform(
      this.leftList,
      this.searchText
    );
    // Trigger change detection
    this.cdr.detectChanges();
  }

  applyFilterRight() {
    this.filteredRightList = this.filterPipe.transform(
      this.rightList,
      this.searchTextRight
    );
    // Trigger change detection
    this.cdr.detectChanges();
  }

  saveData() {
    this.supportedService.saveSupported(this.rightList, 'crypto').subscribe({
      next: () => {
        console.log('Data saved successfully');
        // Display success snackbar
        this.snackbarService.open('Data saved successfully', 'Close', 3000, [
          'success-snackbar',
        ]);
      },
      error: (error) => {
        console.error('Error saving data:', error);
        // Handle error here if needed
      },
    });
  }

  moveItem(item: string, direction: 'left' | 'right') {
    if (direction === 'left') {
      this.filteredRightList = this.filteredRightList.filter((i) => i !== item);
      this.filteredLeftList.push(item);
      this.filteredLeftList.sort();
    } else {
      this.filteredLeftList = this.filteredLeftList.filter((i) => i !== item);
      this.filteredRightList.push(item);
      this.filteredRightList.sort();
    }
  }
}
