import { Component, Input, OnInit } from '@angular/core';
import { EventControllerService, EventResponseControllerService } from 'src/app/openapi';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() event: Object
  resultados: Array<number> = []
  votes: Array<any> = []
  colors = []
  constructor(
    private responsesController: EventResponseControllerService
  ) { }

  ngOnInit(): void {
    this.responsesController.eventResponseControllerFind(this.event['id']).subscribe((responses) => {
      if (responses.length > 0) {
        document.getElementById("responses").classList.remove("d-none")
        for (var i = 0; i < this.event['dates'].length; i++) {
          this.colors.push(this.getRandomColor())
          var theDate = this.event['dates'][i]
          var cont = 0
          const usersVotes = []
          for (var j = 0; j < responses.length; j++) {
            for (var k = 0; k < responses[j]['prefdates'].length; k++) {
              var compDate = responses[j]['prefdates'][k]
              if (theDate['id'] == compDate['id']) {
                usersVotes.push(responses[j]['name'])
                cont++
                break
              }
            }
          }
          this.votes.push(usersVotes)
          this.resultados.push(cont)
        }
        this.graph()
      }
      else {
        document.getElementById("noresponses").classList.remove("d-none")
      }
    })
  }



  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  convertDate(aDate: string): string {
    const aux = new Date(aDate)
    return aux.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })
  }

  graph() {
    var votes = []
    var labels = []
    for (var i in this.event['dates']) {
      var aux: string = ''
      aux = 'Desde: ' + this.convertDate(this.event['dates'][i]['start'])
      aux = aux + ' hasta: ' + this.convertDate(this.event['dates'][i]['end'])
      labels.push(aux)
      votes.push(this.resultados[i])
    }
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: '',
          data: votes,
          backgroundColor: this.colors,
          borderColor: '#FFF',
          borderWidth: 1
        }]
      },
      options: {
        onResize: function (chart, size) {
          if (screen.width < 768)
            chart.options.legend.position = 'top'
          else
            chart.options.legend.position = 'bottom'
          chart.update();
        },
        title: {
          display: true,
          text: 'Resultados del evento: ' + this.event['name']
        },
        legend: {
          position: (screen.width < 768) ? 'top' : 'bottom'
        },
        tooltips: {
          displayColors: false,
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {
              return 'Votos: ' + data.datasets[0].data[tooltipItems.index];
            }
          }
        },
      }
    });
  }


}