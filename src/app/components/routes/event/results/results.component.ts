import { Component, Input, OnInit } from '@angular/core';
import { EventControllerService, EventResponseControllerService } from 'src/app/openapi';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() event: Object
  noResponses: boolean = true
  resultados: Array<number> = []

  constructor(
    private responsesController: EventResponseControllerService
  ) { }

  ngOnInit(): void {
    this.responsesController.eventResponseControllerFind(this.event['id']).subscribe((responses)=>{
      if (responses.length > 0){
        this.noResponses = false
        for (var i = 0; i < this.event['dates'].length; i++){
          var theDate = this.event['dates'][i]
          var cont = 0
          for (var j = 0; j < responses.length; j++){
            for (var k = 0; k < responses[j]['prefdates'].length; k++){
              var compDate = responses[j]['prefdates'][k]
              if (this.compareObj(theDate,compDate)){
                cont++
                break
              }
            }
          }
          this.resultados.push(cont)
        }
      }
    })
  }

  convertDate(aDate: string): String {
    const aux = new Date(aDate)
    return aux.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
  }

  compareObj(a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    if (aKeys.join('') !== bKeys.join('')) {
        return false;
    }
    for (var i = 0; i < aKeys.length; i++) {
        if ( a[aKeys[i]]  !== b[bKeys[i]]) {
            return false;
        }
    }
    return true;
}

}
