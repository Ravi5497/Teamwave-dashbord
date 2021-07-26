import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Idashboard } from './dasboardInterface';
import { catchError } from 'rxjs/operators'

@Injectable(
  {
    providedIn:'root'
  }
)

export class apiService{

    // private url:string = "https://api.stackexchange.com/docs/questions?order=desc&sort=activity&filter=default&site=stackoverflow&run=true";
    private url:string = "https://api.stackexchange.com/"
    constructor(private httpClient : HttpClient){

    }
     getDashboardDetails(data:string):Observable<Idashboard[]>{
       return this.httpClient.get<Idashboard[]>(this.url+data)
       .pipe(catchError(err=>
        {
          return throwError(err);
        }));
      //  .catchError(this.errorHandler);
    }
    // errorHandler(error:HttpErrorResponse){
    //     return Observable.throwError(error.message || "Server error");
    // };
    
}