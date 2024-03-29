import React from 'react';

/*----------- Media ----------*/
import ChartsIcon from '../media/svgs/charts_icon.svg';

/* used ds for prefixes which means it's for dashboard (only the main dashboard) */
export default function DsDataRow(props) {
    return(
        <div className="ds_data_row">
            <div className="col_1 company_info">
                <div className="ds_icon">
                    <ChartsIcon />
                </div>
                <div className="ds_content">
                    <div className="ds_name">{props.ds_name}</div>
                    <div className="ds_country">{props.ds_country}</div>
                </div>
            </div>
            <div className="col_1">
                <div className="ds_date">{props.ds_date}</div>
            </div>
            <div className="col_1">
                <div className="ds_amount">{props.ds_amount}</div>
            </div>
            <div className="col_1">
                <div className="ds_date_2">{props.ds_date_2}</div>
            </div>
            <div className="col_1">
                <strong className="ds_token"> {props.ds_token}</strong>
            </div>
        </div>
    )
}