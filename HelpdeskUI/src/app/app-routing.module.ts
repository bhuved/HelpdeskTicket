import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { TicketdetailComponent } from './ticketdetail/ticketdetail.component';
import { CreateticketComponent } from './createticket/createticket.component';
import { EditticketComponent } from './editticket/editticket.component';
import { BookmarklistComponent } from './bookmarklist/bookmarklist.component';

const routes: Routes = [
  {path: 'tickets', component: TicketlistComponent},
  {path: 'tickets/:id', component: TicketdetailComponent},
  {path: 'createticket', component: CreateticketComponent},
  {path: 'updateticket/:id', component: EditticketComponent},
  {path: 'bookmarks', component: BookmarklistComponent},
  {path: '', redirectTo: '/tickets', pathMatch: 'full'}

];

/*const routes: Routes = [
  {path: 'donuts', component: DonutsComponent},
  {path: 'halloffame', component: HalloffameComponent}, 
  {path: 'donuts/:id', component: DonutdetailsComponent},
  {path: 'cart', component: CartComponent},  
  {path: '', redirectTo:'/donuts', pathMatch: 'full'} //default route
];*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
