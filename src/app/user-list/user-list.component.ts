import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = [
    'username',
    'referenceId',
    'activeSince',
    'activation',
  ];
  dataSource: any[] = [
    { username: 'user1', referenceId: '123', activeSince: '2022-01-01' },
    { username: 'user2', referenceId: '456', activeSince: '2022-02-01' },
    // Add more data as needed
  ];
  toggleActivation(user: any): void {
    // Implement your activation logic here
    // You can toggle between "activate" and "invalidate"
    user.activation =
      user.activation === 'activate' ? 'invalidate' : 'activate';
  }
  ngOnInit(): void {}
}
