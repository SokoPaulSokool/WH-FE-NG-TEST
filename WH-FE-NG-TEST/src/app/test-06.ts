/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page 
 */
 import { Component, NgModule, Pipe, PipeTransform  } from '@angular/core';
 import { RouterModule} from "@angular/router";
 import { CommonModule } from '@angular/common';
 import { DomSanitizer } from '@angular/platform-browser';
 
 @Pipe({
   name: "clean_html_data",
 })
 export class CleanHtmlDataPipe implements PipeTransform {
   constructor(private _domSanitizer: DomSanitizer) {}

   transform(value: any, args?: any): any {
     return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));
   }

   private stylize(text: string): string {
     let textCleaned = text
       .replace(/<[^>]*>/g, "")
       .replace(/\r\n|\r|\n/g, "</br>");
     let stylizedText: string = "";
     if (textCleaned && textCleaned.length > 0) {
       for (let t of textCleaned.split(" ")) {
         if (t.startsWith("http") && t.length > 1)
           stylizedText += `<a href="#${t.substring(1)}">${t}</a> `;
         else stylizedText += t + " ";
       }
     } else stylizedText = textCleaned;
     return stylizedText;
   }
 }
 
 @Component({
   selector: "ng-app",
   template: `
     <h2>User Review:</h2>
     <textarea
       class="textfield"
       placeholder="Write your Review"
       [value]="review_input"
       (input)="textFieldChange($event.target.value)"
     ></textarea>
     <br /><br />
     <h3>Output:</h3>
     <div class="output" [innerHTML]="review_content | clean_html_data"></div>
   `,
   styles: [
     `
       .textfield {
         width: 600px;
         height: 220px;
         padding: 10px;
         box-sizing: border-box;
       }
     `,
     `
       .output {
         max-width: 100%;
         width: 600px;
         border: solid 1px #f9f6f6;
         padding: 5px;
         background: #ecebeb;
       }
     `,
   ],
 })
 export class ReviewComponent {
   // sample input
   review_input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec. 
 
 Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
           1) Nulla et tempus orci
           2) Integer semper porttitor faucibus
           
 At https://wallethub.com <b>bolded text</b>
 `;
   review_content = "";
 
   ngOnInit() {
     this.review_content = this.review_input;
   }
 
   textFieldChange(value) {
     this.review_content = value;
   }
 }
 
 @NgModule({
     imports : [
         CommonModule,
         RouterModule.forChild([
             {
                 path : "",
                 component : ReviewComponent
             }
         ])
     ],
     declarations : [ReviewComponent, CleanHtmlDataPipe]
 })
 export class ReviewModule {}