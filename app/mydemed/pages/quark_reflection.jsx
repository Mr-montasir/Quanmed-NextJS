'use client';
import React from 'react';
import Image from 'next/image'

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';


//------// Media //------//
import CoreImage from '../media/core.png';
import AtomGif from '../media/gif/atom-c.gif';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';

export default function QuarkReflection() {
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=quark-reflection`);
    if (loading) return;
    if (error) return; 
    return ( 
        <div className="quark_reflection"> 
            <AnimatedTitle title={data[0].title.rendered} />
            {data[0].acf.page_paragraph && (
                <p className="page_paragraph">
                {data[0].acf.page_paragraph}
                </p>
            )}
            <div className="core_analytics">
                    <div className="left_options">
                        <span>Organism</span>
                        <span>Organ Systems</span>
                        <span>Organs</span>
                        <span>Tissues</span>
                        <span>Cells</span>
                        <span>Genome</span>
                        <span>Molecules</span> 
                        <span>Atoms</span> 
                    </div>
                    <div className="right_side">
                        <Image src={CoreImage} className='core_image' alt='Core Image' />
                        <div className="bottom_atoms">
                            <div className="single_atom">
                                <Image src={AtomGif} className='single_atom' alt='Single Atom'/>
                                <span>C</span>
                            </div>
                            <div className="single_atom">
                                <Image src={AtomGif} className='single_atom' alt='Single Atom' />
                                <span>H</span>
                            </div>
                            <div className="single_atom">
                                <Image src={AtomGif} className='single_atom' alt='Single Atom' />
                                <span>N</span>
                            </div>
                            <div className="single_atom">
                                <Image src={AtomGif} className='single_atom' alt='Single Atom' />
                                <span>O</span>
                            </div>
                            <div className="single_atom">
                                <Image src={AtomGif} className='single_atom' alt='Single Atom' />
                                <span>P</span>
                            </div>
                        </div>
                    </div> 
            </div>
        </div>
    )
}