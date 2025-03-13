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
  FilteredTicketList: Ticketmodel[] = [];
  checkStatus: string = '';
  //searchCreatedDate: Date = new Date();
  searchCreatedDate: Date | '' = '';
  message: string = '';
  constructor(private ticketService:TicketService){

  }
  ngOnInit(): void {
    this.callTickets();
  }
callTickets(): void{
  this.ticketService.getTickets().subscribe({
    next: (data: any) => {
      console.log(data);
      this.ticketList = data; 
      this.FilteredTicketList = this.ticketList;        
    },
    error: (error) => {
      console.error("Error fetching data : ", error);
    },
    complete: () => {
      console.log("Data fetching complete");
    }
  });
}
  filterTicketsbyStatus(){
    this.message = '';
    if (this.checkStatus == "Open")    {
      if(this.searchCreatedDate != null){
        console.log(this.searchCreatedDate);
        this.FilteredTicketList = this.ticketList.filter(t => t.status == "Open" && t.createdtime >= this.searchCreatedDate);
      }else{
        this.FilteredTicketList = this.ticketList.filter(t => t.status == "Open");
      }
      
    } 
    else if (this.checkStatus == "Closed") {
      if(this.searchCreatedDate != null){
        this.FilteredTicketList = this.ticketList.filter(t => t.status == "Closed" && t.createdtime >= this.searchCreatedDate);
      } else{
        this.FilteredTicketList = this.ticketList.filter(t => t.status == "Closed");
      }
    }
    else if (this.checkStatus == "All") {
      if(this.searchCreatedDate != null){
        this.FilteredTicketList = this.ticketList.filter(t => t.createdtime >= this.searchCreatedDate );
      }else{
        this.FilteredTicketList = this.ticketList
      }
    }
    if (this.FilteredTicketList.length <= 0){
      this.message ="No Records for your search, try different one";
    }
  }

  filterTickets(){
    let createQuery: string = '';
    this.message='';
    if (this.checkStatus === 'Open' || this.checkStatus === 'Closed') {
      createQuery = `status=${this.checkStatus}`;
    }
    if (this.searchCreatedDate != '') {
      // If createQuery already has content, prepend '&' to append the next parameter

      createQuery += createQuery ? `&createdDateFrom=${this.searchCreatedDate}` : `createdDateFrom=${this.searchCreatedDate}`;
    }
    console.log(createQuery);
    if (createQuery == null || createQuery == ""){
      this.callTickets();
    }
    else{
      this.callSearchTickets(createQuery)
      
    }
   
  }

  callSearchTickets(createQuery : string) : void{
    this.ticketService.getSearchTickets(createQuery).subscribe({
      next: (data: any) => {
        console.log(data);
        this.ticketList = data; 
        this.FilteredTicketList = this.ticketList;   
        
    if (this.FilteredTicketList.length <= 0){
      this.message ="No Records for your search, try different one";
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
     
  

}
