'use client';
import React from "react"; 

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import HistoryRow from '../components/historyRow';
import RecentOrdersRow from '../components/recent_orders_row';
import PieChart from '../components/charts/pie_chart';

//------// Media //------//
import ChevronDownIconFill from '../media/svgs/chevron_fill_down.svg';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';
import useDropdown from '../hooks/useDropdown';


export default function Statistics() {
    useDropdown(); 
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=statistics`);
    if (loading) return;
    if (error) return; 
    const assets_data = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
        },
        title: {
            text: '', 
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b>{point.name}'
        },
        series: [{
            minPointSize: 30,
            innerSize: '70%',
            borderRadius: 0,
            data: [
                {
                    name: 'BTC',
                    y: 70,
                    z: 100
                },
                {
                    name: 'ETH',
                    y: 13,
                    z: 97
                },
                {
                    name: 'VHA Token',
                    y: 10,
                    z: 96
                },
                {
                    name: 'Others',
                    y: 7,
                    z: 95
                },
            ],
            colors: [
                '#607BCC',
                '#C292EB',
                '#99EDF9',
                '#3966EF',
            ],
            dataLabels: {
                enabled: false // Disable data labels
            }
        }],
    };
    
    
    
    return (
        <div className="statistics">
            {/* <AnimatedTitle title="Statistics" /> */}
            <AnimatedTitle title={data[0].title.rendered} />
            { data[0].acf.page_paragraph && (
                <p className="page_paragraph">
                {data[0].acf.page_paragraph}
                </p>
            )}
            <div className="panels_container">
                <div className="two_columns">
                    <div className="panel">
                        <div className="panel_top">
                            <div className="left_side">
                                <h3 className="panel_heading"> Assets </h3>
                            </div>
                            <div className="right_side">
                                <div className="button_dropdown">
                                    <div className="button_trigger">
                                        <div className="three_dots">
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                        </div>
                                    </div>
                                    <div className="button_dropdown_content">
                                        <div className="dropdown_option choosen_option">All Activity</div>
                                        <div className="dropdown_option">Applying</div>
                                        <div className="dropdown_option">Completed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel_content">
                            <PieChart chart_data={assets_data} />
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel_top">
                            <div className="left_side">
                                <h3 className="panel_heading"> Convert </h3>
                            </div>
                            <div className="right_side">
                                <div className="button_dropdown">
                                    <div className="button_trigger">
                                        <div className="three_dots">
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                        </div>
                                    </div>
                                    <div className="button_dropdown_content">
                                        <div className="dropdown_option choosen_option">All Activity</div>
                                        <div className="dropdown_option">Applying</div>
                                        <div className="dropdown_option">Completed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel_content">
                            <form className="convert_currency">
                                <div className="input_wrapper from">
                                    <input type="number" placeholder='100' />
                                    <div className="button_dropdown">
                                        <div className="button_trigger">
                                            <span>USDT</span> <ChevronDownIconFill />
                                        </div>
                                        <div className="button_dropdown_content">
                                            <div className="dropdown_option choosen_option">BTC</div>
                                            <div className="dropdown_option">ETH</div>
                                            <div className="dropdown_option">BNB</div>
                                            <div className="dropdown_option">XRP</div>
                                            <div className="dropdown_option">ADA</div>
                                            <div className="dropdown_option">SOL</div>
                                            <div className="dropdown_option">DOT</div>
                                            <div className="dropdown_option">DOGE</div>
                                            <div className="dropdown_option">LTC</div>
                                            <div className="dropdown_option">LINK</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="input_wrapper to">
                                    <input type="number" placeholder='5' />
                                    <div className="button_dropdown">
                                        <div className="button_trigger">
                                            <span>VHA</span> <ChevronDownIconFill />
                                        </div>
                                        <div className="button_dropdown_content">
                                            <div className="dropdown_option">BTC</div>
                                            <div className="dropdown_option">ETH</div>
                                            <div className="dropdown_option">BNB</div>
                                            <div className="dropdown_option">XRP</div>
                                            <div className="dropdown_option">ADA</div>
                                            <div className="dropdown_option">SOL</div>
                                            <div className="dropdown_option">DOT</div>
                                            <div className="dropdown_option">DOGE</div>
                                            <div className="dropdown_option">LTC</div>
                                            <div className="dropdown_option">LINK</div>
                                            <div className="dropdown_option choosen_option">VHA</div>
                                        </div>
                                    </div>
                                </div>
                                <button>Convert Now</button>
                                <p>The ultimate price and output is determined by the amount of tokens in the pool at the time of your swap.</p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="panel history">
                    <div className="panel_top">
                        <div className="left_side">
                            <h3 className="panel_heading"> History </h3>
                        </div>
                        <div className="right_side">
                            <div className="button_dropdown">
                                <div className="button_trigger"> View All </div> 
                            </div>
                        </div>
                    </div>
                    <div className="panel_content">
                        <div className="sl_table">
                            <div className="table_body">
                                <HistoryRow 
                                    iconStatus="down"
                                    name="SOL"
                                    amount="+$23,738"
                                    time="11:34 PM"
                                    status="pending"
                                />
                                <HistoryRow 
                                    iconStatus="up"
                                    name="SANDUSDT"
                                    amount="-$576"
                                    time="06:01 AM"
                                    status="success"
                                />
                                <HistoryRow 
                                    iconStatus="down"
                                    name="VHA TOKEN"
                                    amount="+$3500"
                                    time="02:10 AM"
                                    status="success"
                                />
                                <HistoryRow 
                                    iconStatus="up"
                                    name="FTMUSDT"
                                    amount="+$791"
                                    time="06:45 PM"
                                    status="success"
                                /> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="two_columns">
                    <div className="panel">
                        <div className="panel_top">
                            <div className="left_side">
                                <h3 className="panel_heading"> recent Appointments </h3>
                            </div>
                        </div>
                        <div className="panel_content">
                            <div className="recent_orders">
                                <div className="recent_orders_head">
                                    <div className="orders_title ro_title">Orders</div>
                                    <div className="amount_title ro_title">amount</div>
                                </div> 
                                <div className="recent_orders_content">
                                    <RecentOrdersRow 
                                        name="Dr theresa web" 
                                        time="2 minutes ago"
                                        amount="$65.00" 
                                    />
                                    <RecentOrdersRow 
                                        name="Dr esther cooper" 
                                        time="2 minutes ago"
                                        amount="$85.00" 
                                    />
                                    <RecentOrdersRow 
                                        name="Dr floyd web" 
                                        time="2 minutes ago"
                                        amount="$75.00" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel_top">
                            <div className="left_side">
                                <h3 className="panel_heading"> data analysis </h3>
                            </div>
                            <div className="right_side">
                                <div className="button_dropdown">
                                    <div className="button_trigger">
                                        <div className="three_dots">
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                            <div className='sl_dot'></div>
                                        </div>
                                    </div>
                                    <div className="button_dropdown_content">
                                        <div className="dropdown_option choosen_option">All Activity</div>
                                        <div className="dropdown_option">Applying</div>
                                        <div className="dropdown_option">Completed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel_content">
                            <div className="data_analysis">
                                <div className="data_title">last week</div>
                                <div className="manual_vertical_chart"> 
                                    <div className="chart_column">
                                        <div className="chart_value" style={ { height: '70%' } }></div>
                                        <div className="chart_numbers">150</div>
                                        <div className="chart_name">bank account</div>
                                    </div>
                                    <div className="chart_column">
                                        <div className="chart_value" style={ { height: '100%' } }></div>
                                        <div className="chart_numbers">350</div>
                                        <div className="chart_name">VHA Token</div>
                                    </div>
                                    <div className="chart_column">
                                        <div className="chart_value" style={ { height: '60%' } }></div>
                                        <div className="chart_numbers">2510</div>
                                        <div className="chart_name">credit card</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}