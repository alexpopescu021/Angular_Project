import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
    private modalService: BsModalService,
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
      }
    });

    this.userService.getUser(this.username).subscribe((user) => {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.fullName = `${this.firstName || ''} ${this.lastName || ''}`.trim();
      this.email = user.email;
      this.address = user.address;
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
    [this.firstName, this.lastName] = this.fullName.split(' ');

    const userUpdateDto: UserUpdateDto = {};

    if (this.firstName) {
      userUpdateDto.firstName = this.firstName;
    }
    if (this.lastName) {
      userUpdateDto.lastName = this.lastName;
    }
    if (this.email) {
      userUpdateDto.email = this.email;
    }
    if (this.address) {
      userUpdateDto.address = this.address;
    }
    if (this.phoneNumber) {
      userUpdateDto.telephoneNumber = this.phoneNumber;
    }

    this.userService
      .updateUser(this.username, userUpdateDto)
      .subscribe((user) => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.address = user.address;
      });

    this.closeModal();
  }
}
