import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  eventUrl(){
    return environment.SITE_URL + 'event/' + this.eventCreated['id']
  }

  resultEventUrl(){
    return environment.SITE_URL + 'event/' + this.eventCreated['id'] + '?auth=' + this.eventCreated['auth']
  }

}