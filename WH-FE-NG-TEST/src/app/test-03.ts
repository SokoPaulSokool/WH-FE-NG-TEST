/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
 import { Component, NgModule  } from '@angular/core';
 import { RouterModule } from "@angular/router";
 import { CommonModule } from '@angular/common';
 
 @Component({
   selector: "ng-app",
   template: `<form (submit)="onSubmit($event)">
     <h2>Login</h2>
     <br />
     <input
       type="email"
       name="email"
       [value]="email"
       (change)="emailChange($event.target.value)"
     />
 
     <p
       *ngIf="emailErrorMessage"
       [ngStyle]="{ color: 'red', fontSize: '0.7em' }"
     >
       {{ emailErrorMessage }}
     </p>
     <br />
     <input
       autocomplete=""
       [(value)]="password"
       name="password"
       (change)="passwordChange($event.target.value)"
     />
     <p
       *ngIf="passwordErrorMessage"
       [ngStyle]="{ color: 'red', fontSize: '0.7em' }"
     >
       {{ passwordErrorMessage }}
     </p>
     <button type="submit">Submit</button>
     <br /><br />
     <div *ngIf="logged_in">Logged In!</div>
   </form>`,
 })
 export class Test03Component {
   email: string = "";
   password: string = "";
 
   logged_in = false;
 
   emailErrorMessage = "";
   passwordErrorMessage = "";
 
   onSubmit(e) {
     e.preventDefault();
     if (
       this.isEmailAddressValid(this.email) &&
       this.isPasswordValid(this.password)
     ) {
       this.logged_in = true;
       this.emailErrorMessage = "";
      this.passwordErrorMessage = "";
     }
   }
   emailChange(email) {
     this.email = email;
     if (!this.isEmailAddressValid(this.email)) {
       this.emailErrorMessage = "Invalid Email";
     } else {
       this.emailErrorMessage = "";
     }
   }
   passwordChange(password) {
     this.password = password;
     if (!this.isEmailAddressValid(this.password)) {
       this.passwordErrorMessage = "Invalid Password";
     } else {
       this.passwordErrorMessage = "";
     }
   }
   isEmailAddressValid(str) {
     var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     return pattern.test(str);
   }
   isPasswordValid(str) {
     var pattern =
       /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,}$/;
     return pattern.test(str);
   }
 }
 
 @NgModule({
     imports : [
         CommonModule,
         RouterModule.forChild([
             {
                 path : "",
                 component : Test03Component
             }
         ])
     ],
     declarations : [Test03Component]
 })
 export class Test03Module {};