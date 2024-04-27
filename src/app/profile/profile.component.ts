import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';

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
  constructor(private modalService: BsModalService) {}
  name: string = 'Mike Scheinder'; // Initial data
  email: string = 'example@example.com';
  address: string = '123 Street, City';

  modalRef?: BsModalRef;

  openModal() {
    const initialState = {
      name: 'John Doe', // Pass your name data here
      email: 'john@example.com', // Pass your email data here
      address: '123 Street, City', // Pass your address data here
    };
    this.modalRef = this.modalService.show(ProfileModalComponent, {
      initialState,
    });
  }

  closeModal() {
    this.modalRef?.hide();
  }

  saveChanges() {
    // Save changes here (e.g., send to server)
    this.closeModal(); // Close the modal
  }
  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
  }
}
