import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { Bookmarkmodel } from '../model/bookmarkmodel';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-bookmarklist',
  standalone: false,
  templateUrl: './bookmarklist.component.html',
  styleUrl: './bookmarklist.component.css'
})
export class BookmarklistComponent implements OnInit {
  bookmarkList: Bookmarkmodel[] = [];
  checkUserId: number = 0;
  errorMessage: string = '';
  isValid: boolean = false;
  filteredBookmarkList:Bookmarkmodel[] = [];
  constructor(private bookmarkService: BookmarkService, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.bookmarkService.getBookmarks().subscribe({
      next: (data: any) => {
        console.log(data);
        this.bookmarkList = data;
        this.filteredBookmarkList = this.bookmarkList;
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    });
  }
  validateUser(): void {
    if (this.checkUserId === null) {
      this.errorMessage = "Enter UserId number";
      this.filteredBookmarkList = this.bookmarkList;
    }
    else if(this.checkUserId > 0) {
        this.errorMessage = '';
        this.filteredBookmarkList = this.bookmarkList.filter(b => b.userId == this.checkUserId);
        if(this.filteredBookmarkList.length == 0){
          this.errorMessage="No record for UserId: "+this.checkUserId;
        }
      }
      else {
        this.errorMessage='';
        this.filteredBookmarkList = this.bookmarkList;
      }

    }
  }

