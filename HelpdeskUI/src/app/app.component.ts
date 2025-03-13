import { Component, DestroyRef, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';
import { Recordcount } from './model/recordcount';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'HelpdeskUI';

  recordCount: Recordcount = { openTicketCount: 0, closedTicketCount: 0, bookmarkedTicketCount: 0 }
  

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTicketCounts();
    setInterval(() => {
      this.loadTicketCounts();
    }, 10000);

  }
  loadTicketCounts() {
    this.ticketService.getRecordCounts().subscribe({
      next: (data: any) => {
        console.log(data);
        this.recordCount = data;
        console.log("retreiving "+ this.recordCount);
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
