import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {BlotterComponent} from './blotter.view';
import {WindowComponent} from './window.component';
import { PortalModule } from '@angular/cdk/portal';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { RfqTicketWindowHost } from './rfq-ticket-window.host';
import { WindowComponent1 } from './window.component1';
import { LegComponent } from './leg/leg.component';
@NgModule({
  declarations: [AppComponent,BlotterComponent,WindowComponent,RfqTicketWindowHost,WindowComponent1, LegComponent],
  entryComponents :[BlotterComponent,WindowComponent,RfqTicketWindowHost,WindowComponent1],
  imports: [
    BrowserModule,
    PortalModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    DialogModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
