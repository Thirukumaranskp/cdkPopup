import { Inject, Injectable, ViewContainerRef, ComponentFactoryResolver, Component, Type } from '@angular/core';
import { WindowComponent } from './window.component';

@Injectable( { providedIn : 'root'})
export class PopupWindowService{

    private container : ViewContainerRef;
    private cfr : ComponentFactoryResolver;
    constructor() {
        
    }

    initialize(container : ViewContainerRef , cfr : ComponentFactoryResolver){
        this.container = container;
        this.cfr = cfr;
    }

    launchWindow<T>(component : Type<T> , initializer? : IComponentInitializer<T>){
        
    const componentFactory= this.cfr.resolveComponentFactory(component);
  
    const windowFactory = this.cfr.resolveComponentFactory(WindowComponent);
    
    const componentRef = this.container.createComponent(componentFactory);
    if(initializer){
        initializer.initialize(componentRef.instance);
    }
    const windowRef = this.container.createComponent(windowFactory,0 ,undefined,[
      [componentRef.location.nativeElement]])
    }
}

export interface IComponentInitializer<T>{
        initialize(component : T);
}