import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecentIdeasService {

  constructor(private httpclient: HttpClient) { }

  getRecentIdeas():any{
    return this.httpclient.get("http://localhost:8063/api/v1/ideas");
  }

  getIdeaDetails(value):any{
    return this.httpclient.get(`http://localhost:3000/ideas/${value}`)
  }
}
