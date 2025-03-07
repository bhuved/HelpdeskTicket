import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../services/bookmark.service';
import { Bookmarkmodel } from '../model/bookmarkmodel';

@Component({
  selector: 'app-bookmarklist',
  standalone: false,
  templateUrl: './bookmarklist.component.html',
  styleUrl: './bookmarklist.component.css'
})
export class BookmarklistComponent implements OnInit {
bookmarkList: Bookmarkmodel[] = [];
  constructor(private bookmarkService: BookmarkService){}

  ngOnInit(): void {
    this.bookmarkService.getBookmarks().subscribe({
      next: (data: any) => {
        console.log(data);
        this.bookmarkList = data; 
             
      },
      error: (error) => {
        console.error("Error fetching data : ", error);
      },
      complete: () => {
        console.log("Data fetching complete");
      }
    })
  }

}
