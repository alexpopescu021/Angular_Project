import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  @Input() name!: string;
  @Input() email!: string;
  @Input() address!: string;

  constructor() {}

  ngOnInit(): void {}
}
