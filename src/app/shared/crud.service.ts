import { Injectable } from '@angular/core';
import { User } from '../shared/student';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})

export class CrudService {
  UsersRef: AngularFireList<any>;
  UserRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.db.object('/').valueChanges().subscribe((data) => {
      console.log(data);
    });
  }
  

  // Create Student
  AddUser(user: User) {
    this.UsersRef.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      checkIn: user.checkIn,
      checkOut: user.checkOut,
      persons: user.persons
    });
  }

  // Fetch Single Student Object
  GetUser(id: string) {
    this.UserRef = this.db.object('users-list/' + id);
    return this.UserRef;
  }

  // Fetch Students List
  GetUsersList() {
    this.UsersRef = this.db.list('users-list');
    return this.UsersRef;
  }

  // Update Student Object
  UpdateUser(user:User) {
    this.UserRef.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      checkIn: user.checkIn,
      checkOut: user.checkOut,
      persons: user.persons
    });
  }

  // Delete Student Object
  DeleteUser(id: string) {
    this.UserRef = this.db.object('users-list/' + id);
    this.UserRef.remove();
  }
}
