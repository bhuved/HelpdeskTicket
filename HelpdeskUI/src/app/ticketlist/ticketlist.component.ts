import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { Ticketmodel } from '../model/ticketmodel';

@Component({
  selector: 'app-ticketlist',
  standalone: false,
  templateUrl: './ticketlist.component.html',
  styleUrl: './ticketlist.component.css'
})
export class TicketlistComponent implements OnInit {

  ticketList: Ticketmodel[] = [];
  constructor(private ticketService:TicketService){

  }
  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: (data: any) => {
        console.log(data);
        this.ticketList = data; 
             
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
  }

}
