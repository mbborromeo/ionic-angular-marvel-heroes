import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from './character/character';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

interface MarvelResponse {
  readonly items: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class MarvelApiCallService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private publicKey = '071a199f0748e4784ec9d1a918a6c22a';
  private privateKey = '5a074608a129b10cb01e080985b97624e4b46187';
  private ts = new Date().getTime();
  private stringToHash = this.ts + this.privateKey + this.publicKey;
  private hash = /*md5(*/ this.stringToHash /*)*/;
  //private callbackParamKey = 'jsoncallback'; //Angular will assign its own function ng_jsonp_callback_0 as the callback argument for API call in URL

  //private marvelUrl = 'https://gateway.marvel.com:443/v1/public/characters?apikey=' + this.publicKey;  
  private marvelUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=' + this.ts + "&apikey=" + this.publicKey + "&hash=" + this.hash;
  
  
  /** Log a PhotoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MarvelApiCallService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCharacters(): Observable<Character[]> { //Promise<any>
    console.log('marvel-api-call: getCharacters() this.marvelUrl is: ', this.marvelUrl);
    // Send the message _after_ fetching the photos
    this.messageService.add('MarvelApiCallService: fetched characters');

    /*  
    return this.http.jsonp<MarvelResponse>(this.marvelUrl, this.callbackParamKey)      
      .pipe(
        tap(_ => this.log('fetched characters')),
        //map( ({ items }) => items ),
        catchError(this.handleError<Character[]>('getCharacters', []))
      ).toPromise();
    */

   return this.http.get<Character[]>(this.marvelUrl)
    .pipe(
      tap(_ => this.log('fetched characters')),
      catchError(this.handleError<Character[]>('getCharacters', []))
    );
  }
}
