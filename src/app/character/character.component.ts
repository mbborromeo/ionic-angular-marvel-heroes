import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {

  id: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): number {
    this.id = this.getCharacterID();
    console.log("this.id is: ", this.id);
    return this.id;
  }

  getCharacterID(): number {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("id is: ", id);
    return id;
  }

}
