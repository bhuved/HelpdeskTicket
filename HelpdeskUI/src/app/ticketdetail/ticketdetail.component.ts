import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Ticketmodel } from '../model/ticketmodel';

@Component({
  selector: 'app-ticketdetail',
  standalone: false,
  templateUrl: './ticketdetail.component.html',
  styleUrl: './ticketdetail.component.css'
})
export class TicketdetailComponent implements OnInit{

   ticketId: string | null = '';
   checkUserId: number = 0;
   ticketdetails : Ticketmodel = {
     id: 0,
     title: '',
     description: '',
     createdbyUserId: 0,
     createdby: '',
     resolvedby: '',
     status: '',
     resolution: '',
     createdtime: new Date,
     resolvedtime: null
       }

  constructor(private ticketService: TicketService, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.ticketId = params.get("id");
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
    })
  }
checkValidity(): void{
  if (this.checkUserId === null || this.checkUserId === 0){
    
  }
}

}
