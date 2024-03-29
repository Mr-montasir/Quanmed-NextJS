import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; 
import variablePie from 'highcharts/modules/variable-pie';
variablePie(Highcharts); 

export default function PieChart( props ) {  
    return ( 
        <div className={`pie_chart ${props.customClass ? props.customClass : ''}`}>
            <HighchartsReact
                className="chart_const"
                highcharts={Highcharts}
                options={props.chart_data}
            /> 
            <div className="chart_keys">
                <div className="chart_item">
                    <div className="chart_color btc" ></div> <span className="chart_name">BTC</span> 
                </div>
                <div className="chart_item"> 
                    <div className="chart_color eth" ></div> <span className="chart_name">ETH</span> 
                </div>
                <div className="chart_item"> 
                    <div className="chart_color vha" ></div> <span className="chart_name">VHA Token</span> 
                </div>
                <div className="chart_item"> 
                    <div className="chart_color others" ></div> <span className="chart_name">Others</span>
                </div>
            </div>
        </div>
    )
}