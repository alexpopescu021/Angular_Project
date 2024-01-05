import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  loginForm!: FormGroup;

  constructor(public loginService: LoginService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: [''],
      Password: [''],
    });
  }
  onSubmit() {
    var data = this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        alert(res.message);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
    return data;
  }
}
