// list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss'],
})
export class ListComponent {
  @Input() items: any[] = [];
  @Input() title: string = '';
  @Output() itemClickedEvent = new EventEmitter<any>();

  itemClicked(item: any) {
    this.itemClickedEvent.emit(item);
  }
}
