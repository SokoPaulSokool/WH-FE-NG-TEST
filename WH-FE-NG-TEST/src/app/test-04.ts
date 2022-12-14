/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
 import { Component, NgModule  } from '@angular/core';
 import { RouterModule} from "@angular/router";
 import { CommonModule } from '@angular/common';
 
 @Component({
   selector: "ng-app",
   template: `
     <h2>Enter your first and last name</h2>
     <div>
       <input
         type="text"
         name="First Name"
         placeholder="First Name"
         (change)="firstNameChange($event.target.value)"
       />
       <br />
       <input
         type="text"
         name="Last Name"
         placeholder="Last Name"
         (change)="lastNameChange($event.target.value)"
       />
       <p *ngIf="firstName || lastName">
         {{ firstName }}_{{ lastName }}_{{ randomNumber }}
       </p>
     </div>
   `,
   styles: [],
 })
 export class UserNameComponent {
   firstName = "";
   lastName = "";
   randomNumber = 0;
 
   firstNameChange(firstName) {
     this.firstName = firstName.toLowerCase();
     this.genRandomNumber();
   }
   lastNameChange(lastName) {
     this.lastName = lastName.toLowerCase();
     this.genRandomNumber();
   }
   genRandomNumber() {
     this.randomNumber = Math.floor(Math.random() * 10);
   }
 }
 
 @NgModule({
     imports : [
         CommonModule,
         RouterModule.forChild([
             {
                 path : "",
                 component : UserNameComponent
             }
         ])
     ],
     declarations : [UserNameComponent]
 })
 export class UserNameModule {};