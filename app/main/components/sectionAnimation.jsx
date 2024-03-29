'use client';
import React from 'react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export function useAnimateSection(data) {
  const swiperRef = useRef(null); 
  console.log(data);
  const titleAnimation = (isFirst) => {
    if (isFirst) {
      const activeSlide = document.querySelector('.swiper-slide-active h2');
      activeSlide.classList.add('show_title');
    }

    const allTitles = gsap.utils.toArray('.section_content h2');
    allTitles.forEach((singleTitle) => {
      SplitType.revert(singleTitle);
    });

    const splitTitle = new SplitType('.swiper-slide-active h2');
    const titleChar = document.querySelectorAll('.swiper-slide-active h2 .char');

    gsap.to(titleChar, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      delay: 0.2,
      duration: 0.05,
    }); 
  };

  useEffect(() => {
    if (data !== null) {
      const swiperInstance = swiperRef.current.swiper; 
      swiperInstance.on('transitionStart', () => {
        const scrollNavLinks = document.querySelectorAll('.scrollNav a');
  
        const allTitles = gsap.utils.toArray('.section_content h2');
        allTitles.forEach((sTitle) => {
          sTitle.classList.remove('show_title');
        });
  
        const currentSection = document.querySelector('.swiper-slide-active .section_content');
        const activateThisNav = currentSection.getAttribute('data-floating-nav');
  
        scrollNavLinks.forEach((floatNav) => {
          const floatNavSec = floatNav.getAttribute('data-for-section');
          if (floatNavSec === activateThisNav) {
            floatNav.classList.add('active');
          } else {
            floatNav.classList.remove('active');
          }
        });
  
        if (document.querySelector('.swiper-slide-active h2')) { 
          document.querySelector('.swiper-slide-active h2').classList.add('show_title');
        }
        titleAnimation(false);
      });    
    }
  }, [data]);

  useEffect(() => {
    if (data !== null) {
      titleAnimation(true);
    }
  }, [data]); 
  return { swiperRef }; 
}
