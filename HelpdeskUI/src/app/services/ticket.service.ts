import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ticketmodel } from '../model/ticketmodel';
import { Createticketmodel } from '../model/createticketmodel';
import { BehaviorSubject } from 'rxjs';
import { Recordcount } from '../model/recordcount';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private URL: string = "https://localhost:7138/api/Tickets";
  recordCount: Recordcount = {openTicketCount:0,closedTicketCount:0,bookmarkedTicketCount:0}
  private totalRecordCounts: BehaviorSubject<Recordcount> = new BehaviorSubject<Recordcount>(this.recordCount)

  constructor(private http: HttpClient) { }

  getTickets(){
    return this.http.get(this.URL);
  }

  getSearchTickets(query: string){
    return this.http.get(this.URL+ "/search?"+query);
  }

  getTicketdetailsId(id: number | null){
    return this.http.get(`${this.URL}/${id}`);
  }

  createTicket(ticket : Createticketmodel){
    return this.http.post(this.URL, ticket);
  }

  validateUserid(id: number){
    return this.http.get(`${this.URL}/validate-user/${id}`)
  }

  updateTickets(ticket: Ticketmodel){
    return this.http.put(`${this.URL}/${ticket.id}`, ticket)
  }

  getRecordCounts(){
    return this.http.get(`${this.URL}/counts`);
  }


}
