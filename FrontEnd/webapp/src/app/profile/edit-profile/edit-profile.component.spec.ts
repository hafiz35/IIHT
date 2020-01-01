import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations: [ EditProfileComponent ],
      providers:[UserService,
        {provide:AuthService, useClass:MockAuthService},
        HttpClient,
      {provide:Router}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('invalid when form is empty', () => {
    expect(component.signUpForm.valid).toBeTruthy();
  });


 it('username validity', () => {
    let username = component.signUpForm.controls['username'];
    username.setValue('abc');
    expect(username.valid).toBeTruthy();
  });



  xit('username validity when empty', () => {
    let username = component.signUpForm.controls['username'];
    username.setValue('');
    expect(username.valid).toBeFalsy();
  });
  xit('email validity not in correct format', () => {
    let email = component.signUpForm.controls['email'];
    email.setValue('abcgmail');
    expect(email.valid).toBeFalsy();
  });
  it('email validity', () => {
    let email = component.signUpForm.controls['email'];
    email.setValue('abc@gmail.com');
    expect(email.valid).toBeTruthy();
  });


  xit('mobile validity when empty', () => {
    let mobile = component.signUpForm.controls['contact'];
    mobile.setValue('');
    expect(mobile.valid).toBeFalsy();
  });

  xit('mobile validity when not in correct format', () => {
    let mobile = component.signUpForm.controls['contact'];
    mobile.setValue('9473373rtyrytyty');
    expect(mobile.valid).toBeFalsy();
  });
  xit('mobile validity when shorter in length', () => {
    let mobile = component.signUpForm.controls['contact'];
    mobile.setValue('9473373');
    expect(mobile.valid).toBeFalsy();
  });
  xit('mobile validity when greater in length', () => {
    let mobile = component.signUpForm.controls['contact'];
    mobile.setValue('94733736767676');
    expect(mobile.valid).toBeFalsy();
  });

  it('mobile validity', () => {
    let mobile = component.signUpForm.controls['contact'];
    mobile.setValue('9473373626');
    expect(mobile.valid).toBeTruthy();
  });



  it('get username validity when empty', () => {
    let username = component.signUpForm.controls['username'];
    username.setValue('');
    expect(component.username.value).toBeFalsy();
  });

  it('get email validity', () => {
    let email = component.signUpForm.controls['email'];
    email.setValue('abc@gmail.com');
    expect(component.email.value).toBe('abc@gmail.com');
  });


  
  it('get mobile validity', () => {
    let mobile = component.signUpForm.controls['contact'];
    mobile.setValue('9473373626');
    expect(component.contact.value).toBe('9473373626');
  });
});
