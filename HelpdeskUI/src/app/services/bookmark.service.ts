import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private URL ="https://localhost:7138/api/Bookmarks";
  constructor(private http:HttpClient) { }

  getBookmarks(){
    return this.http.get(this.URL);
  }

  checkBookmark(ticketId: number | null, userId: number){
    return this.http.get(`${this.URL}/checkbookmark/${ticketId}/${userId}`);
  }
  removeBookmark(ticketId: number | null, userId: number){
    return this.http.delete(`${this.URL}/removebookmark/${ticketId}/${userId}`);

  }
  createBookmark(TicketId: number | null, UserId: number){
    const bookmark = {TicketId,UserId   }
    return this.http.post(this.URL,bookmark);
  }
}

