import React from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export default function VerticalChart(props) {
    const charts_data = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
        },

        title: {
            text: '',
            align: 'left'
        },

        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            labels: {
                style: {
                    color: '#8F8F8F'
                }
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            max: 100,
            title: {
                text: '',
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                },
                style: {
                    color: '#8F8F8F'
                },
            }
        },

        tooltip: {
            format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
                'Total: {point.stackTotal}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                borderRadius: 35,
                pointRange: 0.45
            },
        },

        legend: {
            enabled: false
        },

        series: props.series_data
    }
    return (
        <div data-chart-num={props.chartNum} className={`vertical_chart ${props.customClass ? props.customClass : ''}`}>
            <HighchartsReact
                className="chart_const"
                highcharts={Highcharts}
                options={charts_data}
            />
        </div>
    )
}