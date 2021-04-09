import React from 'react';
import {Line} from 'react-chartjs-2';



class Chart extends React.Component {

  render() {

    const data = this.props.priceData.map((price, i)=>{
      return price.price; 
    });

    const dataLabels = this.props.priceData.map((price,i)=>{
      return Date(price.price_timestamp); 
    });

   const {chartFor} = this.props;
   
    const dataPlot = {
      labels: [...dataLabels,...dataLabels],
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [...data],
        }
      ]
    };
    const optionsForTable = {
      legend: false,
      scales:{
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks:{
            display: false
          }
        },
      ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks:{
              display: false
            }
          }
        ],
        ticks: {
          beginAtZero: true
        }
      }
    }

    const optionsForCoinInfo = {
      scales:{
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks:{
            display: true
          }
        },
      ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks:{
              display: true
            }
          }
        ],
        ticks: {
          beginAtZero: true
        }
      }

    }
    
    const options = chartFor==='table' ? optionsForTable : optionsForCoinInfo;
   
    return (
      <div style={this.props.size}>
        <Line
          data={dataPlot}
          options={options}
        />
      </div>
    );
  }
}

export default Chart;