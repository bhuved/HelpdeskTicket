import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Createticketmodel } from '../model/createticketmodel';
import { FormsModule } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-createticket',
  standalone: false,
  templateUrl: './createticket.component.html',
  styleUrl: './createticket.component.css'
})
export class CreateticketComponent implements OnInit {
  newTicket: Createticketmodel = { title: '', description: '', createdbyUserId: 0 }
  successMessage: string = '';
  errorMessage: string = '';
  isValid: boolean = false;

  constructor(private ticketService: TicketService) { }
  ngOnInit(): void {

  }

  callCreateTicket(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.newTicket.createdbyUserId == null) {
      this.errorMessage = "Enter UserId"
    }
    this.ticketService.validateUserid(this.newTicket.createdbyUserId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isValid = data;
        if (this.isValid == false) {
          this.errorMessage = "UserId not exist."
        }
        else {
          this.errorMessage = '';
    
          this.ticketService.createTicket(this.newTicket).subscribe({
            next: (response) => {
              console.log('Record added successfully', response);
              this.resetForm();
              this.successMessage = "Ticket created successfully"
            },
            error: (error) => {
              console.error('Error adding record', error);
              this.successMessage='';
              this.errorMessage = "Error adding record";
              this.successMessage='';
            }
          });
         
        } 
        setTimeout(() => {this.successMessage=''; this.errorMessage='';},3000);
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
    
  }

  clearInput() : void{
    this.resetForm();
  }
  resetForm():void{
    this.errorMessage='';
    this.successMessage = '';
    this.newTicket.createdbyUserId=0;
    this.newTicket.description='';
    this.newTicket.title='';
  }

}
