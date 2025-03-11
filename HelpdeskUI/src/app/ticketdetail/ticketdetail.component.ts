import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Ticketmodel } from '../model/ticketmodel';
import { BookmarkService } from '../services/bookmark.service';

@Component({
  selector: 'app-ticketdetail',
  standalone: false,
  templateUrl: './ticketdetail.component.html',
  styleUrl: './ticketdetail.component.css'
})
export class TicketdetailComponent implements OnInit {

  ticketId: number | null =0;
  checkUserId: number = 0;
  message: string = '';
  isValid: boolean = false;
  isBookmarked: boolean = false;

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

  checkValidity(): void {
    this.isValid= false;    
    this.message='';
    if (this.checkUserId !== null && this.checkUserId > 0) {
      this.ticketService.validateUserid((this.checkUserId)).subscribe({
        next: (data: any) => {
          console.log(data);
          this.isValid = data;
          if (this.isValid == false) {
            this.message = "UserId not exist"
          }
          else {
            this.message = '';
            this.checkTicketBookmarked();
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
    else {this.message = "Enter UserId"}
    
  }

  checkTicketBookmarked(): void {
    this.bookmarkService.checkBookmark(this.ticketId, this.checkUserId).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.isBookmarked = data;
          if (this.isBookmarked) {
            const confirmDelete = window.confirm('This ticket is already bookmarked. Do you want to remove it?');
            if (confirmDelete) {
              this.removeBookmark(this.ticketId, this.checkUserId);
            }
          }
          else {
            const confirmAdd = window.confirm('This ticket has not been bookmarked. Do you want to bookmark it?');
            if (confirmAdd) {
              this.createBookmark(this.ticketId,this.checkUserId);
            }
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
  removeBookmark(ticketId: number | null, userId: number) : void{
    this.bookmarkService.removeBookmark(ticketId, userId).subscribe({
      next: (data) => {
        console.log(data);
        this.isBookmarked = false;
        alert('Ticket removed successfully');
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
        alert('An error occurred while removing the ticket from bookmarks.');
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
  }
  createBookmark(ticketId: number | null, userId: number): void {
    this.bookmarkService.createBookmark(ticketId, userId).subscribe({
        next: (data: any) => {
        console.log(data);
        alert('Ticket bookmarked successfully')
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
        alert('Problem creating Bookmark');
      },
      complete: () => {
        console.log("Data fetching complete");
      }
  });
  }

}
     