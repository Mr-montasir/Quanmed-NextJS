import React, { useState } from 'react';

//------// Media //------//
import ClipboardIcon from '../media/svgs/clipboard.svg';
import ChevronDown from '../media/svgs/down_chevron.svg';


export default function DataTable( props ) {
    const [selectedSortOption, setSelectedSortOption] = useState('all');
    const filteredRows = props.data_rows.filter(single_data => {
        if (selectedSortOption === 'all') {
            return true; 
        } else {
            return single_data.row_status === selectedSortOption;
        }
    });
    return (
        <div className="data_table">
            <div className="table_head">
                <div className="half_table">
                    <div className="table_name">{props.table_name}</div>
                </div>
                <div className="half_table">
                    {props.date_set == true && (
                        <div className="col_1 table_date">Date <ChevronDown /></div>
                    )}
                    {props.type_set == true && (
                        <div className="col_1 table_type">Type <ChevronDown /></div>
                    )}
                    {props.sort_set == true && (
                        <div className="col_1 table_sort">
                            <div className="button_dropdown">
                                <div className="button_trigger">
                                    <span>Sort</span> <ChevronDown />
                                </div>
                                <div className="button_dropdown_content">
                                    <div className="dropdown_option choosen_option" onClick={() => setSelectedSortOption('all')}>All</div>
                                    <div className="dropdown_option" onClick={() => setSelectedSortOption('completed')}>Completed</div>
                                    <div className="dropdown_option" onClick={() => setSelectedSortOption('applying')}>Applying</div>
                                </div>
                            </div> 
                        </div>
                    )}
                </div>
            </div>
            <div className="table_content">
                { filteredRows.map(single_data => (
                    <div className="table_row" key={single_data.row_id}>
                        <div className="half_table">
                            <div className="col_1 content_name">
                                <div className={`copy_clypboard ${single_data.row_status}`}><ClipboardIcon /></div> 
                                <span>{single_data.row_title}</span>
                            </div>
                        </div>
                        <div className="half_table">
                            {props.date_set == true && (
                                <div className="col_1 content_date">{single_data.row_date}</div>
                            )}
                            {props.type_set == true && (
                                <div className="col_1 content_type">{single_data.row_type}</div>
                            )}
                            {props.sort_set == true && (
                                <div className="col_1 content_sort">
                                    <div className={`col_1 sort_btn ${single_data.row_status}`}>
                                        {single_data.row_status}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> 
                )) }
            </div>
        </div>
    )
}