import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login-sms',
  templateUrl: './login-sms.component.html',
  styleUrls: ['./login-sms.component.scss']
})
export class LoginSmsComponent implements OnInit {

  constructor(private auth:UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.captchaCreator()
    }, 200);
  }

  captchaCreator(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    window.recaptchaVerifier.render();
  }

  sendCode(phoneNumber: string){
    this.auth.sendCode(phoneNumber, window.recaptchaVerifier);
  }

  checkCode(code: string){
    this.auth.checkCode(code);
  }

}
