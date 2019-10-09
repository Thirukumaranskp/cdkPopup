import {
  Component,
  ViewChild,
  OnInit,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  OnDestroy,
  ViewContainerRef,
  TemplateRef,
  AfterViewInit
} from '@angular/core';
import { CdkPortal, DomPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { BlotterComponent } from './blotter.view';

/**
 * This component template wrap the projected content
 * with a 'cdkPortal'.
 */

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'rfq-ticket-host',
  template: `
    <ng-container *cdkPortal #viewcontainer>
    <monoworkspace-blotter></monoworkspace-blotter>
    </ng-container>
    
  `
})
export class RfqTicketWindowHost implements OnInit, OnDestroy , AfterViewInit{
  
  // STEP 1: get a reference to the portal
  @ViewChild(CdkPortal, { static: true }) portal: CdkPortal;

  host : DomPortalOutlet;

  // STEP 2: save a reference to the window so we can close it
  private externalWindow = null;

  // STEP 3: Inject all the required dependencies for a PortalHost
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private viewContainerRef : ViewContainerRef,
    private injector: Injector
  ) {}

  ngOnInit() {
    //this.open();
  }

  ngAfterViewInit(): void {
    this.open();
  }

  open() {
    // STEP 4: create an external window
    this.externalWindow = window.open(
      '/assets/popupwindow.html',
      '',
      'width=600,height=400,left=200,top=200'
    );
    this.externalWindow.onblur = () => {
      console.log('window blurred');
    };
    this.externalWindow.onready = () => {
      // document = this.externalWindow.document;
    };

    this.externalWindow.onload = () => {
      // STEP 5: create a PortalHost with the body of the new window document

      this.host = new DomPortalOutlet(
        this.externalWindow.document.body,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );

      // STEP 6: Attach the portal
      // let f = new TemplatePortal(this.portal.templateRef,this.viewContainerRef,
      //   this.injector);
    //  host.attachComponentPortal(f);
       this.host.attach(this.portal);
       this.applicationRef.attachView(this.viewContainerRef.get(0));
        
    };
  }

  ngOnDestroy() {
    // STEP 7: close the window when this component destroyed
    this.externalWindow.close();
  }
}
