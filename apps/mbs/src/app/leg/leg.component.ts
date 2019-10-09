import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  Output,
  EventEmitter,
  ɵLocaleDataIndex
} from '@angular/core';

@Component({
  selector: 'monoworkspace-leg',
  template: `<div>
    <ng-template ngFor let-legIndex="index" let-ticetLeg [ngForOf]="legs">
            
        <ng-container *ngTemplateOutlet="legTemplate">
                
        </ng-container>
        <ng-template #legTemplate >
                <div><div>
                        <p>{{ selectedCity }}</p>
                        <p>{{ enriched }}</p>
                        <input [(ngModel)]="leg1Value" />
                        <input [(ngModel)]="leg2Value" />
                      </div>
                      <p>last operation {{ operation }}</p>
                    </div>  
        </ng-template>
    </ng-template>
   
</div>`,
  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegComponent implements OnInit, AfterViewInit {
  constructor(private cdr : ChangeDetectorRef) {
   // this.cdr.detach();
  }

  legs = [1,2,3]
  
  _selectedCity: City;
  get selectedCity(): City {
    return this._selectedCity;
  }

  @Input()
  set selectedCity(value: City) {
    if(!value) return;
    this._selectedCity = value;
    this.enriched = `enriched ${this._selectedCity.name}`;
    this.leg1Value = value.code;
   // this.cdr.detectChanges();
  }

  _operation: string;
  get operation(): string {
    return this._operation;
  }

  @Input()
  set operation(value: string) {
    this._operation = value;
    this.cdr.detectChanges();

  }

  
  enriched : string;

  _leg1Value = '0';
  get leg1Value() : string{
    return this._leg1Value;
  }

  set leg1Value(value : string){
    this._leg1Value = value;

  }

  _leg2Value ='';
  get leg2Value() : string{
    return this._leg1Value;
  }

  set leg2Value(value : string){
    this._leg2Value = value;
    this.QuouteChanged.emit(this._leg2Value);
  }


  @Output() QuouteChanged = new EventEmitter<string>();

  ngOnInit() {}

  ngAfterViewInit(){
  }
}

