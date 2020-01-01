import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';

export class MockAuthService{
  loggedInUser:BehaviorSubject<User>=new BehaviorSubject<User>({
    username:"string",
    password:"string",
    role:"string",
    email:"string",
    mobileNumber:"string",
    confirmed:true
  });
}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations: [ ChangePasswordComponent ],
      providers:[UserService,
        {provide:AuthService, useClass:MockAuthService},
        HttpClient,
      {provide:Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('invalid when form is empty', () => {
    expect(component.editForm.valid).toBeFalsy();
  });

 it('username validity', () => {
    let username = component.editForm.controls['username'];
    username.setValue('abc');
    expect(username.valid).toBeTruthy();
  });


  it('username validity when empty', () => {
    let username = component.editForm.controls['username'];
    username.setValue('');
    expect(username.valid).toBeFalsy();
  });

  it('password validity', () => {
    let password = component.editForm.controls['password'];
    password.setValue('pwd12345678');
    expect(password.valid).toBeTruthy();
  });


  it('password validity when empty', () => {
    let password = component.editForm.controls['password'];
    password.setValue('');
    expect(password.valid).toBeFalsy();
  });


  it('newPassword validity when empty', () => {
    let newPassword = component.editForm.controls['newPassword'];
    newPassword.setValue('');
    expect(newPassword.valid).toBeFalsy();
  });

  it('newPassword validity when shorter in length', () => {
    let newPassword = component.editForm.controls['newPassword'];
    newPassword.setValue('pwd');
    expect(newPassword.valid).toBeFalsy();
  });
  it('newPassword validity', () => {
    let newPassword = component.editForm.controls['newPassword'];
    newPassword.setValue('pwd12345678');
    expect(newPassword.valid).toBeTruthy();
  });




it('get username validity when empty', () => {
  let username = component.editForm.controls['username'];
  username.setValue('');
  expect(component.username.value).toBe('');
});

it('get username validity', () => {
  let username = component.editForm.controls['username'];
  username.setValue('abc');
  expect(component.username.value).toBe('abc');
});

it('get password validity', () => {
  let password = component.editForm.controls['password'];
  password.setValue('pwd12345678');
  expect(component.password.value).toBe('pwd12345678');
});


it('get password validity when empty', () => {
  let password = component.editForm.controls['password'];
  password.setValue('');
  expect(component.password.value).toBe('');
});


it('get newPassword validity when empty', () => {
  let newPassword = component.editForm.controls['newPassword'];
  newPassword.setValue('');
  expect(component.newPassword.value).toBe('');
});
it('get newPassword validity', () => {
  let newPassword = component.editForm.controls['newPassword'];
  newPassword.setValue('pwd12345678');
  expect(component.newPassword.value).toBe('pwd12345678');
});



});
