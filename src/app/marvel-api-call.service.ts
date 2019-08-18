import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from './character/character';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import md5 from 'crypto-js/md5';

/*
interface MarvelResponse {
  data: {};
  readonly items: Character[];
}
*/

@Injectable({
  providedIn: 'root'
})
export class MarvelApiCallService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //Auth signing: https://github.com/brix/crypto-js
  private publicKey = '071a199f0748e4784ec9d1a918a6c22a';
  private privateKey = '5a074608a129b10cb01e080985b97624e4b46187';
  private ts = new Date().getTime();
  private stringToHash = this.ts + this.privateKey + this.publicKey;
  private hash = md5( this.stringToHash );
  private marvelSearchCategory = "";
  private marvelAPIQueryString = "";
  private marvelAPIBase = 'https://gateway.marvel.com:443/v1/public/';
  private tsString = "?ts=" + this.ts;
  private apiKeyString = "&apikey=" + this.publicKey;
  private hashString = "&hash=" + this.hash;
    
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

  getCharacters(): Observable<Character[]> {    
    // Send the message _after_ fetching the photos
    this.messageService.add('MarvelApiCallService: fetched characters');

    this.marvelSearchCategory = "characters";    
    this.marvelAPIQueryString = this.marvelAPIBase + 
      this.marvelSearchCategory + 
      this.tsString + 
      this.apiKeyString + 
      this.hashString;

    return this.http.get<any>(this.marvelAPIQueryString) //Character[], MarvelResponse
      .pipe(
        tap( r => console.log('fetched characterS data is ', r), ),        
        //map( r => r.data.results ),
        catchError(this.handleError<Character[]>('getCharacters', []))
      );
  }

  getCharacter( id: number ): Observable<Character> {
    console.log("marvelAPICallService: getCharacter(id) ID is: " + id);

    this.messageService.add('MarvelAPICallService: fetched character');

    this.marvelSearchCategory = "characters" + "/" + id;
    this.marvelAPIQueryString = this.marvelAPIBase + 
      this.marvelSearchCategory + 
      this.tsString + 
      this.apiKeyString + 
      this.hashString;

    return this.http.get<any>(this.marvelAPIQueryString)
      .pipe(
        tap( r => console.log('fetched character data is ', r), ),                
        catchError(this.handleError<Character>('getCharacter'))
      );
  }
}
