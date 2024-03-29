'use client';
import React from 'react';

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';


export default function Monetisation() {
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=monetisation`);
    if (loading) return;
    if (error) return; 
    return (
        <div className="monetisation"> 
            <AnimatedTitle title={data[0].title.rendered} />
            {data[0].acf.page_paragraph && (
                <p className="page_paragraph">
                {data[0].acf.page_paragraph}
                </p>
            )}
        </div>
    )
}