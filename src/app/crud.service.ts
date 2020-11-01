import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Tiketti } from './tiketti';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = 'http://localhost:3000/tiketti';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.log('tämä on error');
    console.log(error);
    return throwError(error);
  }

  getAll() {
    return this.http.get(this.apiServer);
    // return this.http.get<Tiketti[]>(this.apiServer + '/tiketti/')
  }

  getTiketti(id) {
    const url = `${this.apiServer}/${id}`;
    return this.http.get<Tiketti>(url, this.httpOptions);
  }

  create(tiketti: Tiketti): Observable<Tiketti> {
    tiketti.id = null;
    return this.http.post<Tiketti>(this.apiServer, tiketti, this.httpOptions).pipe(
      tap(data => console.log('tämä tulee servicestä' + data)),
      catchError(this.handleError)
    );
  }

  delete(id) {
    const url = `${this.apiServer}/${id}`;
    console.log('frontin servicestä poistettava');
    console.log(id);
    return this.http.delete(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update(id, data) {
    const url = `${this.apiServer}/${id}`;
    console.log('frontin service update');
    console.log(id);
    return this.http.put(url, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
