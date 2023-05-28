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

  constructor(private auth:UserService) { }

  ngOnInit(): void {
  }

  async login(user:string, pass: string){
    try {
      await this.auth.login(user,pass);
    } catch (e: any) {
      alert(e.message)
    }
  }

}
