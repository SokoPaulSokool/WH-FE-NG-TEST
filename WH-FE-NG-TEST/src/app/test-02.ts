/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
 import { Component, EventEmitter, NgModule, Output  } from '@angular/core';
 import { RouterModule } from "@angular/router";
 import { CommonModule } from '@angular/common';
 
 @Component({
     selector : 'textfield',
     template : '<input type="text" [value]="field"  (input)="onValueChange($event.target.value)"  /> '
 })
 export class TextField {
      field = "";
 
     @Output() onFieldChange: EventEmitter<any> = new EventEmitter<any>();
 
     onValueChange(val:any){
       this.onFieldChange.emit(val); 
     }
 }
 
 @Component({
     selector : 'child-component',
     template : `<h2>Title:<h2><br/><textfield (onFieldChange)="onChange($event)"></textfield>`
 })
 export class ChildComponent {
     title=""
     @Output() onTitleChange: EventEmitter<any> = new EventEmitter<any>();
 
     onChange(val:any){
         this.title=val
         this.onTitleChange.emit(val);
     }
 
 }
 
 
 @Component({
     selector : 'ng-app',
     template : `<div>
                     <child-component (onTitleChange)="onChange($event)"></child-component> <br/>
                     Title is {{title}}
                 </div>`
 })
 export class Test02Component {
 
     title = "";
     onChange(val:any){
         this.title= val
     }
 }
 
 @NgModule({
     imports : [
         CommonModule,
         RouterModule.forChild([
             {
                 path : "",
                 component : Test02Component
             }
         ])
     ],
     declarations : [Test02Component,ChildComponent,TextField]
 })
 export class Test02Module {};