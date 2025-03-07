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
}

