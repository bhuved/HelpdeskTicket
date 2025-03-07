import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { TicketdetailComponent } from './ticketdetail/ticketdetail.component';
import { CreateticketComponent } from './createticket/createticket.component';
import { EditticketComponent } from './editticket/editticket.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TicketlistComponent,
    TicketdetailComponent,
    CreateticketComponent,
    EditticketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
