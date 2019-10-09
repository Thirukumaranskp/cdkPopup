import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'monoworkspace-blotter',
  encapsulation : ViewEncapsulation.None,
  template: `
  
  <h2>Hello world from amother window!!</h2>
  <span>{{ticket}}</span>
  <p-dropdown [options]="cities" [(ngModel)]="selectedCity" placeholder="Select a City" optionLabel="name" [showClear]="true"></p-dropdown>
<p>Selected City: {{selectedCity ? selectedCity.name : 'none'}}</p>
  <button (click)="increment()">content {{count}}</button>
  <div>
    <button (click)="onlegOperation('send')">Send</button>
    <button (click)="onlegOperation('notmine')">Ignore</button>
    <button (click)="onlegOperation('mine')">Mine</button>
    <button (click)="onlegOperation('accept')">Accept</button>
    <button (click)="onlegOperation('reject')">Reject</button>
  </div>
  <span>{{quoteValue}}</span>
  <monoworkspace-leg [selectedCity]=selectedCity 
   [operation]="operation"
   (QuouteChanged)="onQuoteChanged($event)"
  ></monoworkspace-leg>

`,
styles:[`
<link rel="stylesheet" type="text/css" href="http://localhost:4200/assets/primeicons.css" />
<link rel="stylesheet" type="text/css" href="http://localhost:4200/assets//primeng.min.css" />
`],
changeDetection : ChangeDetectionStrategy.OnPush
  
})
export class BlotterComponent {
  title = 'mbs';
  count = 0;
  cities: City[];
  display = true;
  selectedCity: City;
  operation : string ;
  ticket : string;
  quoteValue : string;
  constructor(){
    this.cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ];

  }
 
  increment(){
      console.log('incrementing', document, window.document);
    this.count++;
  }


  onlegOperation(operation : string){
    this.operation = operation;
  }

  onQuoteChanged(quoteValue : string){
     this.quoteValue = quoteValue;
  }
}
