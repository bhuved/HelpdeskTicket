import { Component, OnInit } from '@angular/core';
import { Ticketmodel } from '../model/ticketmodel';
import { TicketService } from '../services/ticket.service';
import { BookmarkService } from '../services/bookmark.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editticket',
  standalone: false,
  templateUrl: './editticket.component.html',
  styleUrl: './editticket.component.css'
})
export class EditticketComponent implements OnInit {

  ticketId: number | null = 0;
  errorMessage: string = '';
  successMessage: string = '';
  isValid: boolean = false;

  ticketdetails: Ticketmodel = {
    id: 0,
    title: '',
    description: '',
    createdbyUserId: 0,
    resolvedbyUserId: 0,
    createdby: '',
    resolvedby: '',
    status: '',
    resolution: '',
    createdtime: new Date,
    resolvedtime: null
  }

  constructor(private ticketService: TicketService, private bookmarkService: BookmarkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.ticketId = Number(params.get("id"));
      }
    );
    this.ticketService.getTicketdetailsId(this.ticketId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.ticketdetails = data;
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
  }

  callUpdateTicket(): void {
    this.errorMessage='';
    this.successMessage='';
    if (this.ticketdetails.status == "Closed")
    {
      if (this.ticketdetails.resolvedbyUserId && this.ticketdetails.resolvedbyUserId > 0) {
         this.isValidUserId(this.ticketdetails.resolvedbyUserId);
        
      }else {this.errorMessage = "Enter UserId";}
    }
    else if (this.ticketdetails.status == "Open"){
      //console.log(this.ticketdetails)
      this.updateTicketdetails(this.ticketdetails);
    } 
    
  }

  isValidUserId(userId: number){
    
    this.errorMessage='';
    this.ticketService.validateUserid(this.ticketdetails.resolvedbyUserId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isValid = data;
        if (this.isValid == true) {
          this.updateTicketdetails(this.ticketdetails);
        }
        else {
          this.errorMessage = "UserId not exist, Enter Valid one";
        }
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
  }

  updateTicketdetails(ticketdetails: Ticketmodel): void {

    this.ticketService.updateTickets(ticketdetails).subscribe({
      next: (data: any) => {
        console.log(data);
        this.successMessage = " Ticket updated successfully";
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
        this.errorMessage = error?.message || "Error updating ticket";
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
  }

  resetInput(): void {

  }
}
