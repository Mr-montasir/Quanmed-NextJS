'use client';
import React, { useRef } from 'react';
// import mammoth from 'mammoth';
// import axios from 'axios';
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


export default function ThirdParty() {
    const fileRef = useRef(null);
    useDropdown();
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=third-party`);
    if (loading) return;
    if (error) return; 

    const getFileExtension = (filename) => {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
    }

    const submitFile = async (filename, type, text) => {
        let response = await axios.post(`${serverUrl}/api/v1/medical/upload/file`, {
            file_name: filename,
            type: type,
            text: text
        })
        if(response.status) {
            alert("File upload was successed.")
        } else {
            alert("File upload was failed.")
        }
    }
    const saveTxtFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result
            submitFile(file.name, "txt", content)
        }
        reader.readAsText(file)
    }

    const saveWordFile = (file) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const result = await convertToPlainText(arrayBuffer);
        submitFile(file.name, getFileExtension(file.name), result)
        };

        reader.readAsArrayBuffer(file);
    } 

    const savePDFFile = async (file) => {
        let extractedText = '';
        let read = false

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        await new Promise((resolve) => {
            reader.onload = resolve
        })
        const pdfBytes = reader.result;
        const loadingTask = pdfjsLib.getDocument({ data: pdfBytes});
        const pdf = await loadingTask.promise;
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            extractedText += pageText;
        }

        if (extractedText != '')
            read = true
        if (read == false) {
            console.log("123", file)

            await convertPdfToImagesAndReadText(file).then(function (textArray) {
                console.log(textArray);
                extractedText = textArray[0]
            }).catch(function (error) {
                console.error(error);
            });
        }
        submitFile(file.name, "pdf", extractedText)
    }
    function convertPdfToImagesAndReadText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function () {
                const typedArray = new Uint8Array(this.result);
    
                pdfjsLib.getDocument(typedArray).promise.then(function (pdf) {
                    const totalPages = pdf.numPages;
                    const imagePromises = [];
    
                    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                        imagePromises.push(
                            pdf.getPage(pageNumber).then(function (page) {
                                const viewport = page.getViewport({ scale: 1.5 });
                                const canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
                                canvas.height = viewport.height;
                                canvas.width = viewport.width;
    
                                const renderContext = {
                                    canvasContext: context,
                                    viewport: viewport,
                                };
    
                                return page.render(renderContext).promise.then(function () {
                                    return new Promise((resolve) => {
                                        canvas.toBlob(function (blob) {
                                            const reader = new FileReader();
                                            reader.onloadend = function () {
                                                resolve(this.result);
                                            };
                                            reader.readAsDataURL(blob);
                                        }, 'image/jpeg', 0.75);
                                    });
                                });
                            })
                        );
                    }
    
                    Promise.all(imagePromises).then(function (imageDataArray) {
                        const textPromises = [];
    
                        imageDataArray.forEach(function (imageData) {
                            textPromises.push(
                                Tesseract.recognize(imageData, 'eng').then(function (result) {
                                    return result.data.text;
                                })
                            );
                        });
    
                        Promise.all(textPromises).then(function (textArray) {
                            resolve(textArray);
                        }).catch(reject);
                    }).catch(reject);
                }).catch(reject);
            };
            reader.readAsArrayBuffer(file);
        });
    }
    const convertToPlainText = (arrayBuffer) => {
        return new Promise((resolve, reject) => {
          mammoth.extractRawText({ arrayBuffer: arrayBuffer })
            .then((result) => {
              resolve(result.value);
            })
            .catch((error) => {
              reject(error);
            });
        });
      };
    const uploadFile = (event) => {
        const file = event.target.files[0];
        switch(getFileExtension(file.name)){
            case "txt":
                saveTxtFile(file);
                break;
            case "doc":
                saveWordFile(file);
                break;
            case "docx":
                saveWordFile(file);
                break;
            case "pdf":
                savePDFFile(file);
                break;
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
            <AnimatedTitle title={data[0].title.rendered} />
            <div className="upload_download_block"> 
                {data[0].acf.page_paragraph && (
                    <p>
                    {data[0].acf.page_paragraph}
                    </p>
                )}
                <div className="upload_download_buttons">
                    <div className="sl_button upload" data-open-popup="upload" onClick={() => {
                        fileRef.current.click()
                    }}>
                        Upload <UploadIcon />
                    </div>
                    <input type='file' name='file' accept='.txt,.docx,.pdf' style={{ display: "none"}} ref={fileRef} onChange={uploadFile}/>
                    <div className="sl_button download" >
                        Download <DownloadIcon />
                    </div>
                </div>
            </div>
            <DataTable
                table_name="My uploaded records"
                date_set={true}
                type_set={true}
                sort_set={true}
                data_rows={my_uploaded_records}
            />
            <DataTable
                table_name="Neutron overview"
                date_set={true}
                type_set={true}
                sort_set={true}
                data_rows={neutron_overview}
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