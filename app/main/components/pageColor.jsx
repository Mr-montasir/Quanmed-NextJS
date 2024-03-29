import React from 'react';
import useFetch from '../hooks/useFetch';

const PageColor = ({ pageID, apiName })=> {
    const {data, error, loading} = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/${apiName}/${pageID}`);
    if (loading) return;
    if (error) return;

    const choosenColor = data.acf.page_color;

    return choosenColor;
}

export default PageColor;