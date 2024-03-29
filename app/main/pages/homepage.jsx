"use client";

import React, { useEffect, useContext } from 'react';
//------// Plugins //------//
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Mousewheel } from 'swiper/modules'; 

import 'swiper/css/mousewheel';
 
//------// Components //------//
import { useAnimateSection  } from '../components/sectionAnimation';
import ScrollNav from '../components/scroll_nav';
import SectionContent from '../components/sectionContent';
import { SwiperContext } from '../components/SwiperContext';
import goToDashboard from '../components/navigation'
import { useAuth } from '../../hooks/use-auth'; 
import { useParams } from 'next/navigation';
import { usePopupFunctions } from '../../mydemed/hooks/popups'; 

export default function Homepage() { 
  const { swiperRef: animateSectionRef } = useAnimateSection(true);  
  let { activeIndex } = useContext(SwiperContext);
  const { swiperRef } = useContext(SwiperContext);

  const { open, close } = useWeb3Modal()

  const id = useParams()["*"]
  
  useEffect(() => {
    if (id == 'logout')
      document.getElementById("mydemed").click()
  }, []);

  useEffect(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(activeIndex);
    }
  }, [activeIndex]);
  const sectionContentData = [
    {
      id: 0, 
      title: "Quantum <br> Medical Ecosystem", 
      paragraph: "Personalised - Ai - Decentralised - Blockchain",
      floating_nav: "home",
      floating_nav_text: "Home",
      has_video: true,
    },
    {
      id: 1, 
      title: "Lepton Lab ", 
      paragraph: "Facilitating users to anonymize and upload their medical history to the Blockchain with different access levels. Decentralisation implementing pharmaceutical research community accountability, and immutable medical records resistant to 'modification'.", 
      floating_nav: "lepton",
      floating_nav_text: "Lepton",
      button: "Enter Lab",
      button_link: "/lepton-lab",
    },
    {
      id: 2, 
      title: "Proton Lab ", 
      paragraph: "Enabling researchers to access, purchase and analyse medical profiles. Facilitating: monetization and open source data analysis thus closing the ubiquitous disparity between computing experts involvement in medicine and clinicians technological comprehension.", 
      floating_nav: "proton",
      floating_nav_text: "Proton",
      button: "Enter Lab",
      button_link: "/proton-lab",
    },
    {
      id: 3, 
      title: "Fermion Lab ", 
      paragraph: "Building two AI models: Neutron, based on the language and numeric data set from the proton lab, used for diagnosis, prognosis and testing. Atom, utilising quantum wave formula to build a 'particle level up' machine learning digital representation of the patient called the 'Quark Reflection', used for virtual medical testing.", 
      floating_nav: "fermion",
      floating_nav_text: "Fermion",
      button: "Enter Lab",
      button_link: "/fermion-lab",
    },
    {
      id: 4, 
      title: "Boson Lab ", 
      paragraph: "Utilising the Neutron and Atom AI modules to facilitate decision making automation, diagnosis and atomic scale surgical accuracy in hospital and homecare clinical robotic applications. Resulting in Medicine 5.0, the clinical quantum revolution.", 
      floating_nav: "boson",
      floating_nav_text: "Boson",
      button: "Enter Lab",
      button_link: "/boson-lab",
    },
  ]

  return (
    <div className='dark homepage'>
      <div className="page_content"> 
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
                />

              </SwiperSlide>
            ))} 
        </Swiper> 
      </div>
    </div>
  )
}