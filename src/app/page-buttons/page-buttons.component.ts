import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-buttons',
  templateUrl: './page-buttons.component.html',
  styleUrls: ['./page-buttons.component.scss'],
})
export class PageButtonsComponent implements OnInit {
  @Input() bindedMarvelData; /*: {
    data: {
      count: number,
      offset: number,
      total: number      
    },
    code: number
  };*/

  /*
  private marvelData: {
    data: {
      count: number,
      offset: number,
      total: number      
    },
    code: number
  } = this.bindedMarvelData;
  */

  //variables
  private count: number;
  private offset: number;
  private pageNumber: number = 1; //initially
  private total: number;
  private pagesTotal: number;
  private previousNextOffset: number = 20; 
  private code: number = 99;

  //functions
  calculatePageLocation(): void {
    // this.count = this.bindedMarvelData.data.count;
    // this.offset = this.bindedMarvelData.data.offset;
    // this.total = this.bindedMarvelData.data.total;
    // this.code = this.bindedMarvelData.code;

    // console.log("this.count: ", this.count);
    // console.log("this.offset: ", this.offset);
    // this.pageNumber = Math.floor(this.offset / this.previousNextOffset) + 1;
    // this.pagesTotal = Math.floor(this.total / this.previousNextOffset) + 1;
    // console.log("this.pageNumber: ", this.pageNumber);
    // console.log("this.pagesTotal: ", this.pagesTotal);
  }

  constructor() { }

  ngOnInit() {
    //call functions
    //this.marvelData = this.bindedMarvelData;
    this.calculatePageLocation();
  }

}
