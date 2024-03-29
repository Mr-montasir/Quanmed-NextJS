import React from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export default function SplineChart(props) {
    const charts_data = {
        chart: {
            type: 'spline',
            backgroundColor: 'transparent',
        },
        title: {
            text: ''
        },
        tooltip: {
            format: `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
            <ellipse opacity="0.1" cx="9.70231" cy="9.9605" rx="8.88419" ry="9.39394" fill="#C292EB"/>
          </svg>`
        },
        xAxis: {
            categories: props.horizontal_labels,
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                format: '${value},00'
            }
        },
        tooltip: {
            format: '${y}'
        },
        series: [
            {
                name: 'Wallet',
                color: '#607BCC',
                data: props.chart_data
            },
        ],
        legend: {
            enabled: false,
        }
    }
    return (
        <div data-chart-num={props.chartNum} className={`spline_chart ${props.customClass ? props.customClass : ''}`}>
            <HighchartsReact
                className="chart_const"
                highcharts={Highcharts}
                options={charts_data}
            />
        </div>
    )
}