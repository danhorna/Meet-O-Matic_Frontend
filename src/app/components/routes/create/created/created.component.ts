import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.css']
})
export class CreatedComponent implements OnInit {

  @Input() eventCreated: Object
  constructor() { }

  ngOnInit(): void {
  }

}
