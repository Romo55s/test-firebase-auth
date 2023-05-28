import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth:UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.captchaCreator()
    }, 200);
  }

  async login(user:string, pass: string){
    try {
      await this.auth.login(user,pass);
    } catch (e: any) {
      alert(e.message)
    }
  }

  async register(user:string, pass: string){
    try {
      await this.auth.register(user,pass);
    } catch (e: any) {
      alert(e.message)
    }
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
