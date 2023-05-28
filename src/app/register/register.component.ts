import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:UserService) { }

  ngOnInit(): void {
  }

  async register(user:string, pass: string){
    try {
      await this.auth.register(user,pass);
    } catch (e: any) {
      alert(e.message)
    }
  }

}
