import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserUpdateDto } from '../models/userUpdateDto.model';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus: any;
  focus1: any;
  focus2: any;

  constructor(
    private userService: UserService,
    private authService: LoginService
  ) {}

  fullName: string = '';
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  phoneNumber: string = '';

  modalRef?: BsModalRef;

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');

    this.authService.userSub.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.loadUserProfile();
      }
    });
  }

  loadUserProfile() {
    this.userService.getUser(this.username).subscribe((user) => {
      this.firstName = user.firstName || '';
      this.lastName = user.lastName || '';
      this.fullName = `${this.firstName} ${this.lastName}`.trim();
      this.email = user.email || '';
      this.address = user.address || '';
      this.phoneNumber = user.telephoneNumber || '';
    });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
  }

  openModal() {}

  closeModal() {
    this.modalRef?.hide();
  }

  saveChanges() {
    // Split full name into first and last name parts
    const fullNameParts = this.fullName.split(' ');
    this.firstName = fullNameParts[0] || '';
    this.lastName = fullNameParts.slice(1).join(' ') || '';

    // Initialize userUpdateDto with all fields, even if they are empty
    const userUpdateDto: UserUpdateDto = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      address: this.address.trim(),
      telephoneNumber: this.phoneNumber.trim(),
    };

    this.userService.updateUser(this.username, userUpdateDto).subscribe(
      (user) => {
        // Update local state with the response from the server
        this.firstName = user.firstName ? user.firstName : this.firstName;
        this.lastName = user.lastName ? user.lastName : this.lastName;
        this.fullName = `${this.firstName} ${this.lastName}`.trim();
        this.email = user.email ? user.email : this.email;
        this.address = user.address ? user.address : this.address;
        this.phoneNumber = user.telephoneNumber
          ? user.telephoneNumber
          : this.phoneNumber;
      },
      (error) => {
        console.error('Error updating user:', error);
        // Handle error appropriately
      }
    );

    this.closeModal();
  }
}
