import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private http: HttpClient) { }

  public authorize() {
    console.log("here");

    let httpHeader = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      })
    };

    let scope = 'user-read-private user-read-email';

    /*let completeUrl =  this.url 
      + '?response_type=code' 
      + '&client_id=' + this.my_client_id 
      + '&scope=' + encodeURIComponent(scope)
      + '&redirect_uri=' + encodeURIComponent(this.redirect_uri);

    return this.http.get(completeUrl,httpHeader
    ).pipe(
      tap( result => result)
    )*/
  }


}
