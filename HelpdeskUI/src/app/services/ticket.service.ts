import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ticketmodel } from '../model/ticketmodel';
import { Createticketmodel } from '../model/createticketmodel';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private URL: string = "https://localhost:7138/api/Tickets";
  constructor(private http: HttpClient) { }

  getTickets(){
    return this.http.get(this.URL);
  }

  getTicketdetailsId(id: string | null){
    return this.http.get(`${this.URL}/${id}`);
  }

  createTicket(ticket : Createticketmodel){
    return this.http.post(this.URL, ticket);
  }

  validateUserid(id: number){
    return this.http.get(`${this.URL}/validate-user/${id}`)
  }
}
