import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { error } from 'console';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

declare global {
    interface Window{
        recaptchaVerifier: firebase.auth.RecaptchaVerifier;
        confirmationResult: any;
        grecaptcha:any;
    }
}

@Injectable({
    providedIn: 'root',
})

export class UserService{
    
    constructor(private auth: AngularFireAuth) {
        auth.authState.subscribe(user =>{
            console.log(user);
        })
    }

    // Login de usuario
    login(user: string, pass: string){
        return this.auth.signInWithEmailAndPassword(user,pass);
    }

    // Registro de usuario
    register(user: string, pass: string){
        return this.auth.createUserWithEmailAndPassword(user,pass);
    }

    // LogOut del usuario
    logOut(){
        return this.auth.signOut();
    }

    // Envio del codigo
    sendCode(phoneNumber: string, appVerified: any){
        return this.auth.signInWithPhoneNumber(phoneNumber, appVerified)
        .then(resp =>{
            window.confirmationResult = resp;
            alert("All good!");
        }).catch(error =>{
            console.log(error);
        });
    }

    // Logeo con el codigo enviado
    checkCode(code: string){
        return window.confirmationResult.confirm(code)
        .then((res: any) =>{
            let license = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult, code); // Guardamos la confirmacion para enviarla a FireBase
            this.auth.signInWithCredential(license); // Logeo con el codigo
        })
    }
}