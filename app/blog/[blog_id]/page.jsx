'use client';
import React, { useEffect, useContext } from 'react';
//------// Plugins //------//
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Mousewheel } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/mousewheel';

//------// Components //------// 
import { useAnimateSection  } from '../../main/components/sectionAnimation'; 
import ScrollNav from '../../main/components/scroll_nav';
import SectionContent from '../../main/components/sectionContent';
import { SwiperContext } from '../../main/components/SwiperContext';
import PageColor from '../../main/components/pageColor';

import Footer from '../../main/components/footer';

// For the single Page Only
import useFetch from '../../main/hooks/useFetch';
import { useParams } from 'next/navigation';

export default function Single() {
    const { blog_id } = useParams();
    const colorClass = PageColor({ pageID: blog_id, apiName: 'react-posts' });
    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/react-posts/${blog_id}`); 
    const { swiperRef: animateSectionRef } = useAnimateSection(data);  

    let { activeIndex } = useContext(SwiperContext);
    const { swiperRef } = useContext(SwiperContext);
    console.log(swiperRef); 
    useEffect(() => {
    if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(activeIndex);
    }
    }, [activeIndex, swiperRef]);

    if (loading) return;
    if (error) return;
    
    const sectionContentData = data.acf.section_data_each_scroll; 
    return (
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
    );
}
