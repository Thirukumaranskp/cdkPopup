import {
  Component,
  ViewChild,
  OnInit,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  OnDestroy
} from '@angular/core';
import { CdkPortal, DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

/**
 * This component template wrap the projected content
 * with a 'cdkPortal'.
 */

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'window-host',
  template: `
    <ng-container *cdkPortal #viewcontainer>
      <ng-content></ng-content>
    </ng-container>
  `
})
export class WindowComponent implements OnInit, OnDestroy {
  // STEP 1: get a reference to the portal
  @ViewChild(CdkPortal, { static: true }) portal: CdkPortal;

  // STEP 2: save a reference to the window so we can close it
  private externalWindow = null;

  // STEP 3: Inject all the required dependencies for a PortalHost
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  ngOnInit() {
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

      const host = new DomPortalOutlet(
        this.externalWindow.document.body,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );

      // STEP 6: Attach the portal
      host.attach(this.portal);
    };
  }

  ngOnDestroy() {
    // STEP 7: close the window when this component destroyed
    this.externalWindow.close();
  }
}
