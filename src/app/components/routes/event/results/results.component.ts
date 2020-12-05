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

  constructor(
    private responsesController: EventResponseControllerService
  ) { }

  ngOnInit(): void {
    this.responsesController.eventResponseControllerFind(this.event['id']).subscribe((responses) => {
      if (responses.length > 0) {
        document.getElementById("responses").classList.remove("d-none")
        for (var i = 0; i < this.event['dates'].length; i++) {
          var theDate = this.event['dates'][i]
          var cont = 0
          for (var j = 0; j < responses.length; j++) {
            for (var k = 0; k < responses[j]['prefdates'].length; k++) {
              var compDate = responses[j]['prefdates'][k]
              if (theDate['id'] == compDate['id']) {
                cont++
                break
              }
            }
          }
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
    var colors = []
    var votes = []
    var labels = []
    for (var i in this.event['dates']) {
      var aux: string = ''
      aux = 'Desde: ' + this.convertDate(this.event['dates'][i]['start'])
      aux = aux + ' hasta: ' + this.convertDate(this.event['dates'][i]['end'])
      labels.push(aux)
      votes.push(this.resultados[i])
      colors.push(this.getRandomColor())
    }
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: '',
          data: votes,
          backgroundColor: colors,
          borderColor: '#FFF',
          borderWidth: 1
        }]
      },
      options: {
        onResize: function (chart, size) {
          if (screen.width < 768)
            chart.options.legend.position = 'top'
          else
            chart.options.legend.position = 'right'
          chart.update();
        },
        title: {
          display: true,
          text: 'Custom Chart Title'
        },
        legend: {
          position: (screen.width < 768) ? 'top' : 'right'
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