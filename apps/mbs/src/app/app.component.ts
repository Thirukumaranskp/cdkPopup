import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { BlotterComponent } from './blotter.view';
import {
  PopupWindowService,
  IComponentInitializer
} from './popupwindow-service';

@Component({
  selector: 'monoworkspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mbs';
  canShow = false;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private popupWindowService: PopupWindowService
  ) {}

  ngOnInit() {
    this.popupWindowService.initialize(
      this.container,
      this.componentFactoryResolver
    );
  }

  ngOnDestroy() {}

  openWindow() {
    console.log('opening window1');

    this.popupWindowService.launchWindow<BlotterComponent>(BlotterComponent, <
      IComponentInitializer<BlotterComponent>
    >{
      initialize: (component: BlotterComponent) => {
        component.ticket = 'RFQ Ticket 99';
      }
    });
  }
}
