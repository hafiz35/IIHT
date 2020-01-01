import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editError = false;
  editSuccess = false;
  allowEdit = false;
  disabledButton = false;
  signUpForm: FormGroup = this.formBuilder.group({
    username: {
      value: '',
      disabled: !this.allowEdit,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')]
    },
    contact: {
      value: '',
      disabled: !this.allowEdit,
      validators: [Validators.required, Validators.pattern('[0-9]{10}')]
    },
    email: {
      value: '',
      disabled: !this.allowEdit,
      validators: [Validators.required, Validators.email]
    }
  });
  role: string;
  status: string;
  pwd: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    this.authService.loggedInUser.subscribe((user) => {
      this.username.patchValue(user.username);
      this.contact.patchValue(user.mobileNumber);
      this.email.patchValue(user.email);
      this.role = user.role;
      this.pwd = user.password;
    });
  }


  submit() {
    if (this.allowEdit === false) {
      this.allowEdit = !this.allowEdit;
    } else {
      if (this.signUpForm.valid) {
        const newUser: User = {
          username: this.username.value,
          mobileNumber: this.contact.value,
          role: this.role,
          password: this.pwd,
          email: this.email.value,
        };

        this.userService.updateUser(newUser).subscribe((user: User) => {
          console.log(user);
        },
          () => {
            console.log('Error updating details');
            this.editError = false;
          },
          () => {
            this.editSuccess = true;
            this.allowEdit = !this.allowEdit;
            this.authService.loggedInUser.next(newUser);
          }
        );
      }
    }
  }

  get formControls() {
    return this.signUpForm.controls;
  }
  get username() {
    return this.formControls.username;
  }
  get contact() {
    return this.formControls.contact;
  }
  get email() {
    return this.formControls.email;
  }





}
