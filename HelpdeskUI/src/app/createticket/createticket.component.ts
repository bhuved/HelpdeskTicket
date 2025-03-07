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
newTicket: Createticketmodel = {title:'',  description:'',  createdbyUserId : 0}
loading :boolean = false;
successMessage: string ='';
errorMessage: string = '';
isValid:boolean = false;

  constructor(private ticketService: TicketService){}
  ngOnInit(): void {

  }
  callCreateTicket(): void{
    this.loading = true;
    this.successMessage ='';
    this.errorMessage = '';

    if (this.newTicket.createdbyUserId == null)
    {
      this.errorMessage = "Enter userId"
    }
    this.ticketService.validateUserid(this.newTicket.createdbyUserId).subscribe({
      next: (data: any) => {
        console.log(data);
         this.isValid = data;              
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    })
    if (this.isValid == false)
    {
      this.errorMessage = "Enter Valid UserId"
    }
    else
    {
      this.errorMessage = '';
    }
    this.ticketService.createTicket(this.newTicket).subscribe({
           next: (response) => {
            this.loading = false;
          console.log('Record added successfully', response);
          this.successMessage ="Record added successfully"
          // Optionally, handle success, like resetting the form or showing a success message
        },
        error: (error) => {
          this.loading = false;
          console.error('Error adding record', error);
          this.errorMessage = "Error adding record";
          // Optionally, handle error, like showing an error message
        }
    });
  }

}
