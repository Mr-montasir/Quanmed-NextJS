'use client';
import React, { useEffect, useContext, useState } from 'react'; 
//------// Plugins //------//
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Mousewheel } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/mousewheel';

//------// Components //------//
import { useAnimateSection  } from '../main/components/sectionAnimation'; 
import ScrollNav from '../main/components/scroll_nav';
import SectionContent from '../main/components/sectionContent';
import { SwiperContext } from '../main/components/SwiperContext';
import PageColor from '../main/components/pageColor';

import Footer from '../main/components/footer';

// For the single Page Only
import useFetch from '../main/hooks/useFetch';
import { useParams } from 'next/navigation';

export default function Single() { 
    const { page_slug } = useParams(); 
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/react-pages?slug=${page_slug}`);
    console.log(data);
    const [pageID, setPageID] = useState(54); // Set 54 for the post "NO DELETE" so we get a color backup
  
    useEffect(() => {
      if (!loading && !error && data && data.length > 0) {
        setPageID(data[0]?.id);
      }
    }, [loading, error, data]);
  
    // Assuming PageColor is a function that returns a color class
    const colorClass = PageColor({ pageID, apiName: 'react-pages' });
    const { swiperRef: animateSectionRef } = useAnimateSection(data);  

    let { activeIndex } = useContext(SwiperContext);
    const { swiperRef } = useContext(SwiperContext);
    useEffect(() => {
    if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(activeIndex);
    }
    }, [activeIndex, swiperRef]);

    if (loading) return;
    if (error) return;
    
    const sectionContentData = data[0] ? data[0].acf.section_data_each_scroll : null; 
    return ( 
        <>
            {sectionContentData && ( 
                <div className={colorClass}> 
                    <div className="page_content smaller_content"> 
                    <ScrollNav sectionsArr={sectionContentData} />
                    <Swiper
                        direction='vertical'
                        slidesPerView='auto'
                        speed={0}
                        loop={true}
                        modules={[EffectFade, Mousewheel]} effect="fade"
                        mousewheel={true}
                        keyboard={true}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        ref={animateSectionRef}
                    >
                        {sectionContentData.map((sectionData, index, array) => (
                            <SwiperSlide key={sectionData.id} >
                            <SectionContent 
                                key={sectionData.id} 
                                isLast={array.length - 1 == index} 
                                title={sectionData.title} 
                                paragraph={sectionData.paragraph}
                                button={sectionData.button}
                                buttonLink={sectionData.button_link}
                                has_video={sectionData.has_video} 
                                css_class={sectionData.cssClass}
                                floatingNav={sectionData.floating_nav}
                                section_img={sectionData.image}
                            />
                            </SwiperSlide>
                        ))} 
                    </Swiper> 
                    <Footer />
                    </div>
                </div> 
            )}
        </>
    );
}
