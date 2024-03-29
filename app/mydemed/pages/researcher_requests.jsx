'use client';
import React from 'react';

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import DataTable from '../components/data_table';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';


export default function ResearcherRequests() {
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=researcher-requests`);
    if (loading) return;
    if (error) return; 
    const neutron_overview = [
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
    return (
        <div className="researcher_requests medical_record"> 
            <AnimatedTitle title={data[0].title.rendered} />
            {data[0].acf.page_paragraph && (
                <p className="page_description">
                {data[0].acf.page_paragraph}
                </p>
            )}
            <DataTable
                table_name="Your Data Overview"
                date_set={true}
                type_set={true}
                sort_set={true}
                data_rows={neutron_overview}
            /> 
        </div>
    )
}