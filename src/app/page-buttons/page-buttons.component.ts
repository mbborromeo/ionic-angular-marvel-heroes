import { Component, OnInit, Input } from '@angular/core';
import { MarvelData } from '../marvel-data';
import { Comic } from '../comic/comic';

@Component({
  selector: 'app-page-buttons',
  templateUrl: './page-buttons.component.html',
  styleUrls: ['./page-buttons.component.scss'],
})
export class PageButtonsComponent implements OnInit {
  //expect an input from whichever parent-component uses this child-component
  @Input() bindedMarvelData;

  private marvelData: MarvelData;
  //this.marvelData.data = [...bindedMarvelData.data];


  //variables
  // private count: number;
  // private offset: number;
  // private total: number;
  // private code: number = 99;
  private pageNumber: number; //initially  
  private pagesTotal: number; // = 1
  private previousNextOffset: number; // =20
  

  //functions
  calculatePageLocation(): void {    
    //this.count = this.bindedMarvelData.data.count;
    // this.offset = this.bindedMarvelData.data.offset;
    // this.total = this.bindedMarvelData.data.total;
    // this.code = this.bindedMarvelData.code;

    // console.log("this.count: ", this.count);
    // console.log("this.offset: ", this.offset);
    // this.pageNumber = Math.floor(this.offset / this.previousNextOffset) + 1;
    // this.pagesTotal = Math.floor(this.total / this.previousNextOffset) + 1;
    // console.log("this.pageNumber: ", this.pageNumber);
    // console.log("this.pagesTotal: ", this.pagesTotal);

    //this.marvelData = this.bindedMarvelData;
    //this.marvelData.data.total = 99; //this.bindedMarvelData.data.total;    
    this.marvelData = {
      data: {
          count: 20,
          limit: 60,
          offset: 20,
          results: Comic[
            {
              id: 23,
              title: "",
              description: "",
              format: "",
              thumbnail: {
                  path: "",
                  extension: "",
              },
            }
          ],
          total: 99,
      },
      code: 400,
    };
  }

  constructor() { }

  ngOnInit() {
    //call functions    
    this.calculatePageLocation();
  }

}
