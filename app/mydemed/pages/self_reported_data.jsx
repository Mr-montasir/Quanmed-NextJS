'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import DataTable from '../components/data_table';
import AppCard from '../components/app_card'

//------// Hooks //------//
import useFetch from '../hooks/useFetch';
import useDropdown from '../hooks/useDropdown';
import TableSlider from '../components/table_slider';

//------// Media //------//
import DownloadIcon from '../media/svgs/download.svg';
import UploadIcon from '../media/svgs/upload.svg';

import Sp02 from '../media/svgs/sp02.svg';
import HeartRate from '../media/svgs/heart_rate.svg';
import SleepIcon from '../media/svgs/sleep.svg';
import Meicine from '../media/svgs/medicine.svg';
import EyeTest from '../media/svgs/eye_test.svg';
import GeneralState from '../media/svgs/general_state.svg';

import Plugin1 from '../media/svgs/plugin-1.svg';
import Plugin2 from '../media/svgs/plugin-2.svg';
import Plugin3 from '../media/svgs/plugin-3.svg';
import Plugin4 from '../media/svgs/plugin-4.svg';
import Plugin5 from '../media/svgs/plugin-5.svg';
import Plugin6 from '../media/svgs/plugin-6.svg';


export default function SelfReportedData() {
    useDropdown();
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=self-reported-data`);
    if (loading) return;
    if (error) return; 
    const my_uploaded_records = [
        {
            id: 0,
            row_title: "You have been given medication of heart burn",
            row_date: "10 jan 2021",
            row_type: "salvatory test",
            row_status: "applying",  
        },
        {
            id: 1,
            row_title: "Dr recommended you to stop drinking cold water",
            row_date: "5 oct 2021",
            row_type: "Blood test",
            row_status: "completed", 
        },
        {
            id: 2,
            row_title: "Dr recommended you to stop drinking cold water",
            row_date: "15 oct 2021",
            row_type: "MRI Scan",
            row_status: "completed", 
        },
    ]
    const plugins_data = [
        {
            id: 0,
            image: <Plugin1 />,
            status: 'disconnected', 
        },
        {
            id: 1,
            image: <Plugin2 />,
            status: 'connected', 
        },
        {
            id: 2,
            image: <Plugin3 />,
            status: 'connected', 
        },
        {
            id: 3,
            image: <Plugin4 />,
            status: 'disconnected', 
        },
        {
            id: 4,
            image: <Plugin5 />,
            status: 'connected', 
        },
        {
            id: 5,
            image: <Plugin6 />,
            status: 'connected', 
        },
        {
            id: 6,
            image: <Plugin4 />,
            status: 'disconnected', 
        },
        {
            id: 7,
            image: <Plugin5 />,
            status: 'connected', 
        },
        {
            id: 8,
            image: <Plugin6 />,
            status: 'check', 
        }
    ]
    const tests = [
        {
            id: 0,
            image: <Sp02 />,
            status: 'check', 
            text: 'SpO2'
        },
        {
            id: 1,
            image: <HeartRate />,
            status: 'check', 
            text: 'Heart Rate'
        },
        {
            id: 2,
            image: <SleepIcon />,
            status: 'check', 
            text: 'Sleep Tracking'
        },
        {
            id: 3,
            image: <Meicine />,
            status: 'check', 
            text: 'Medicines'
        },
        {
            id: 4,
            image: <EyeTest />,
            status: 'check', 
            text: 'Eye test'
        },
        {
            id: 5,
            image: <GeneralState />,
            status: 'check', 
            text: 'General state'
        }, 
        {
            id: 6,
            image: <Sp02 />,
            status: 'check', 
            text: 'SpO2'
        },
        {
            id: 7,
            image: <HeartRate />,
            status: 'check', 
            text: 'Heart Rate'
        },
        {
            id: 8,
            image: <SleepIcon />,
            status: 'check', 
            text: 'Sleep Tracking'
        },
    ]
    const apps_data = [
        {
            id: 0,
            appname: "Jessica Jane",
            app_role: "Chemist",
            app_status: "Connected",
            appDescription: "Hi, I'm Jessica Jane. Lorem Ipsum is simply dummy text of the printing and typesetting",
            tasks_number: "40",
            task_name: "Task",
            rating_from_five: 4.2,
            reviews_total: "750",
        },
        {
            id: 1,
            appname: "Abraham Lincoln",
            app_role: "Chemist",
            app_status: "Connected",
            appDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non illo excepturi ipsa rem! Culpa nesciunt incidunt obcaecati nulla, quo aperiam!",
            tasks_number: "32",
            task_name: "Task",
            rating_from_five: 4.9,
            reviews_total: "510",
        },
        {
            id: 2,
            appname: "Curious George",
            app_role: "Chemist",
            app_status: "Connected",
            appDescription: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non illo excepturi ipsa rem! Culpa nesciunt incidunt obcaecati nulla, quo aperiam!",
            tasks_number: "40",
            task_name: "Tasks",
            rating_from_five: 4.7,
            reviews_total: "750",
        },
        {
            id: 3,
            appname: "Alex Stanton",
            app_role: "Chemist",
            app_status: "Chat",
            appDescription: "Hi, I'm Alex Stanton. Lorem Ipsum is simply dummy text of the printing and typesetting etc",
            tasks_number: "60",
            task_name: "Task",
            rating_from_five: 4.7,
            reviews_total: "970",
        },
        {
            id: 4,
            appname: "Anna White",
            app_role: "Chemist",
            app_status: "Chat",
            appDescription: "Hi, I'm Anna White.Lorem Ipsum is simply dummy text of the printing and typesetting...",
            tasks_number: "60",
            task_name: "Medicines",
            rating_from_five: 4.8,
            reviews_total: "870",
        },
        {
            id: 5,
            appname: "Richard Kyle",
            app_role: "Chemist",
            app_status: "Chat",
            appDescription: "Hi, I'm Richard Kyle. Lorem Ipsum is simply dummy text of the printing and typesetting etc",
            tasks_number: "60",
            task_name: "Task",
            rating_from_five: 4.7,
            reviews_total: "730",
        },
    ]
    return (
        <div className="medical_record">
            {/* <AnimatedTitle title="Medical Record: Self Reported Data" /> */}
            <AnimatedTitle title={data[0].title.rendered} />
            {data[0].acf.page_paragraph && (
                <p className="page_paragraph">
                {data[0].acf.page_paragraph}
                </p>
            )}
            <div className="upload_download_block">
                <p>This is where you can upload approved third part health service providers documentation and data</p>
                <div className="upload_download_buttons">
                    <div className="sl_button upload" data-open-popup="upload">
                        Upload <UploadIcon />
                    </div>
                    <div className="sl_button download" >
                        Download <DownloadIcon />
                    </div>
                </div>
            </div>
            <DataTable
                table_name="Your Data Overview"
                date_set={true}
                type_set={false}
                sort_set={true}
                data_rows={my_uploaded_records}
            />
            <div className="tb_slider_panel">
                <h2>Plugins</h2>
                <TableSlider
                    slides_data={plugins_data}
                /> 
            </div>
            <div className="tb_slider_panel">
                <h2>Tests</h2> 
                <TableSlider
                    slides_data={tests}
                />
            </div>
            <div className="community_dapps">
                <h2>Community dApps</h2>
                <Swiper
                    spaceBetween={32}
                    slidesPerView={1.2}
                    breakpoints={{
                        768: { 
                          spaceBetween: 32,
                          slidesPerView: 2.5
                        },
                    }}
                >
                    {apps_data.map((app_inf) => (
                        app_inf.app_status == "Connected" ? (
                            <SwiperSlide key={app_inf.id}>
                                <AppCard 
                                    key={app_inf.id}
                                    appname={app_inf.appname}
                                    app_role={app_inf.app_role}
                                    app_status={app_inf.app_status}
                                    tasks_number={app_inf.tasks_number}
                                    task_name={app_inf.task_name}
                                    rating_from_five={app_inf.rating_from_five}
                                    reviews_total={app_inf.reviews_total}
                                />
                            </SwiperSlide>
                        ) : null
                    ))}
                </Swiper>
            </div>
        </div>
    )
}