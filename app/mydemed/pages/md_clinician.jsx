'use client';
import React, { useRef } from 'react';
// import { serverUrl } from '../../utils/config'
//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import DataTable from '../components/data_table';
import DownloadIcon from '../media/svgs/download.svg';
import UploadIcon from '../media/svgs/upload.svg';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';
import useDropdown from '../hooks/useDropdown';

// const pdfjsLib = require('pdfjs-dist/webpack');
// const Tesseract = require('tesseract.js');

export default function MdClinician() {
    const fileRef = useRef(null);

    useDropdown();
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=medical-record-clinician`);
    if (loading) return;
    if (error) return;

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('Please check your image!')
        }
        try{
            const formData = new FormData();
            formData.append('title', file.name);
            formData.append('category', 'image');
            formData.append('mime', file.type)
            formData.append('file', file)
            const response = await fetch(`${serverUrl}/api/v1/medical/upload/photo`, {
                method: 'POST',
                body: formData
            })
            const result = await response.json();
            alert('Your image have been uploaded successfully!')
        }catch(err){
            alert('Failed to upload your image!')
        }
    }

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
    const clinician_uploaded_records = [
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
        <div className="medical_record">
            {/* <AnimatedTitle title="Medical Record: Clinician" /> */}
            <AnimatedTitle title={data[0].title.rendered} />
            <div className="upload_download_block"> 
                {data[0].acf.page_paragraph && ( 
                    <p>{data[0].acf.page_paragraph}</p>
                )}
                <div className="upload_download_buttons">
                    <div className="sl_button upload" data-open-popup="upload" onClick={() => {
                        fileRef.current.click()
                    }}>
                        Upload <UploadIcon />
                    </div>
                    <input type='file' name='file' accept='.jpg,.jpeg,.png,.bmp' style={{ display: "none"}} ref={fileRef} onChange={uploadFile}/>
                    <div className="sl_button download" >
                        Download <DownloadIcon />
                    </div>
                </div>
            </div>
            <DataTable
                table_name="Neutron overview"
                date_set={true}
                type_set={true}
                sort_set={true}
                data_rows={neutron_overview}
            />
            <DataTable
                table_name="My uploaded records"
                date_set={true}
                type_set={true}
                sort_set={true}
                data_rows={my_uploaded_records}
            />
            <DataTable
                table_name="Clinician uploaded records"
                date_set={true}
                type_set={true}
                sort_set={true}
                data_rows={clinician_uploaded_records}
            />
        </div>
    )
}