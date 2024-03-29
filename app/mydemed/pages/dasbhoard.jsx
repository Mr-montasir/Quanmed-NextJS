"use client";
import React, { useEffect } from 'react'; 

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import ActivityFeed from '../components/activity_feed_row';
import AppointmentRow from '../components/appointment_row';
import DsDataRow from '../components/ds_data_row';

//------// Charts //------//
import VerticalChart from '../components/charts/vertical_chart'

//------// Media //------//
import ChevronDownIcon from '../media/svgs/down_chevron.svg';
import UserSharp from '../media/svgs/user_sharp.svg';

//------// Popups //------//

//------// Hooks //------//
import useFetch from '../hooks/useFetch';
import useDropdown from '../hooks/useDropdown'; 


const Homepage = () => {
  useDropdown();
  const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=homepage`);
  if (loading) return;
  if (error) return; 
  function toggleCharts(chart_to_show) {
    const health_history_charts = document.querySelectorAll('#health_history_charts .vertical_chart');
    health_history_charts.forEach(s_chart => {
      const chartNum = s_chart.getAttribute('data-chart-num');
      s_chart.classList.remove('show');
      if (chartNum == chart_to_show) {
        s_chart.classList.add('show');
      }
    });
  }
  // Series Data
  const serie_data_year =[
      {
        name: 'Biological Health',
        data: [25, 35, 20, 20, 8, 20, 20, 10, 15, 7, 25, 20], 
        color: '#6f588a'
      },  
      {
        name: 'Lifestyle',
        data: [22, 35, 20, 20, 8, 20, 20, 10, 15, 7, 25, 20], 
        color: '#3a4b79'
      }, 
      {
        name: 'Quantum Health',
        data: [50, 20, 15, 18, 18, 42, 37, 40, 50, 40, 18, 40], 
        color: '#8F8F8F'
      }, 
  ]
  const serie_data_6_months =[
      {
        name: 'Biological Health',
        data: [25, 35, 20, 20, 8, 20], 
        color: '#6f588a'
      },  
      {
        name: 'Lifestyle',
        data: [22, 35, 20, 20, 8, 20], 
        color: '#3a4b79'
      }, 
      {
        name: 'Quantum Health',
        data: [50, 20, 15, 18, 18, 42], 
        color: '#8F8F8F'
      }, 
  ]
  const serie_data_month =[
      {
        name: 'Biological Health',
        data: [25], 
        color: '#6f588a'
      },  
      {
        name: 'Lifestyle',
        data: [22], 
        color: '#3a4b79'
      }, 
      {
        name: 'Quantum Health',
        data: [50], 
        color: '#8F8F8F'
      }, 
  ]  
  return (
    <div className='main_dashboard'>
      <AnimatedTitle title={data[0].title.rendered} />
      {data[0].acf.page_paragraph && (
        <p className="page_paragraph">
          {data[0].acf.page_paragraph}
        </p>
      )}
      <div className="panels_container">
        <div className="panel">
          <div className="panel_top">
            <div className="left_side">
              <h3 className="panel_heading"> Your Quantum Health Statistics History </h3>
              <div className="navigation_keys">
                <div className="color gray">Quantum Health</div>
                <div className="color blue">Lifestyle</div>
                <div className="color pink">Biological Health</div>
              </div>
            </div>
            <div className="right_side">
              <div className="button_dropdown">
                <div className="button_trigger"><span>Year</span>  <ChevronDownIcon /></div>
                <div className="button_dropdown_content"> 
                  <div onClick={() => toggleCharts(1)} className="dropdown_option choosen_option">Year</div>
                  <div onClick={() => toggleCharts(2)} className="dropdown_option">6 Months</div>
                  <div onClick={() => toggleCharts(3)} className="dropdown_option">Month</div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel_content">
            <div id='health_history_charts'>
              <VerticalChart chartNum="1" series_data={serie_data_year} customClass="show" /> 
              <VerticalChart chartNum="2" series_data={serie_data_6_months} />
              <VerticalChart chartNum="3" series_data={serie_data_month} />
            </div>
          </div>
        </div>
        <div className="two_columns">
          <div className="panel">
            <div className="panel_top">
              <div className="left_side">
                <h3 className="panel_heading"> Activity Feed </h3>
              </div>
              <div className="right_side">
                <div className="button_dropdown">
                  <div className="button_trigger"><span>All Activity</span>  <ChevronDownIcon /></div>
                  <div className="button_dropdown_content">
                    <div className="dropdown_option choosen_option">All Activity</div>
                    <div className="dropdown_option">Applying</div>
                    <div className="dropdown_option">Completed</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel_content">
              <ActivityFeed
                status="applying"
                feed_title="You have been given medication of heart burn"
                feed_time="10 mins ago"
                icon={<UserSharp />}
              />
              <ActivityFeed
                status="completed"
                feed_title="Dr recommended you to stop drinking cold water "
                feed_time="4 hours ago"
                icon={<UserSharp />}
              />
              <ActivityFeed
                status="completed"
                feed_title="Dr recommended you to stop drinking cold water "
                feed_time="4 hours ago"
                icon={<UserSharp />}
              />
            </div>
          </div>
          <div className="panel">
            <div className="panel_top">
              <div className="left_side">
                <h3 className="panel_heading">Appointments</h3>
              </div>
              <div className="right_side">
                <div className="button_dropdown">
                  <div className="button_trigger"><span>Create New</span>  <ChevronDownIcon /></div>
                  <div className="button_dropdown_content">
                    <div className="dropdown_option choosen_option">Create New</div>
                    <div className="dropdown_option">Recent</div>
                    <div className="dropdown_option">Upcoming</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel_content">
              <AppointmentRow
                day="Mon"
                day_number="10"
                apn_title="Dr Cameron"
                appointment_start_time="9:00 am"
                appointment_end_time="11:30 am"
              />
              <AppointmentRow
                day="Thu"
                day_number="08"
                apn_title="Dr Sara Doe"
                appointment_start_time="9:00 am"
                appointment_end_time="11:30 am"
              />
              <AppointmentRow
                day="Fri"
                day_number="11"
                apn_title="Dr Rober"
                appointment_start_time="9:00 am"
                appointment_end_time="11:30 am"
              />
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel_top">
            <div className="left_side">
              <h3 className="panel_heading"> Recent Researcher Data Requests Messages </h3>
            </div>
          </div>
          <div className="panel_content">
            <div className="sl_table">
              <div className="table_head">
                <div className="col_1"> company name </div>
                <div className="col_1">date</div>
                <div className="col_1">amount</div>
                <div className="col_1">date</div>
                <div className="col_1">Paid By</div>
              </div>
              <div className="table_body">
                <DsDataRow
                  ds_name="sikago & sons"
                  ds_country="uk"
                  ds_date="10 jan 2021"
                  ds_amount="$432.25"
                  ds_date_2="10 jan 2021"
                  ds_token="QMD Token"
                />
                <DsDataRow
                  ds_name="fast tracks"
                  ds_country="uSA"
                  ds_date="5 oct 2021"
                  ds_amount="$563.25"
                  ds_date_2="5 oct 2021"
                  ds_token="QMD Token"
                />
                <DsDataRow
                  ds_name="fanish & company"
                  ds_country="USA"
                  ds_date="15 oct 2021"
                  ds_amount="$256.25"
                  ds_date_2="15 oct 2021"
                  ds_token="QMD Token"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage