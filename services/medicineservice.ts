import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private apiUrl = 'https://dev-api.evitalrx.in/v1/fulfillment/';
  private apiKey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  constructor(private http: HttpClient) {}

  // Medicine search API call
  searchMedicines(term: string): Observable<any> {
    const url = `${this.apiUrl}search_medicines`; 
    const headers = new HttpHeaders({
      Authorization: this.apiKey,
      'Content-Type': 'application/json',
    });

    const body = {
      search: term,
      page: 1,
      per_page: 10,
    };

    return this.http.post<any>(url, body, { headers });
  }
  
}
