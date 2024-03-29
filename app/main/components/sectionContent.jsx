"use client";
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { SwiperContext } from './SwiperContext';
import Image from 'next/image';

// Animation Background Components
import BgLeft from '../media/dna/full_dna.svg';
import BgRight from '../media/dna/right_dna.svg';
import ScrollDown from '../media/scroll_down.svg'
// Video Background
import HomeBackgroundVideo from '../media/background_video.mp4';

// Swiper Settings

export default function SectionContent(props) {
  const { swiperRef } = useContext(SwiperContext);
  const handleLinkClick = () => {  
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  useEffect(() => {
    const animating_bg = document.querySelectorAll('.animating_bg');
    let isMouseMoveActive = true;

    // Define the elements outside the event listeners
    const elements = [];
    const containers_elements = [];
    animating_bg.forEach(bg_animation => { 
      const element = {
        left_first: bg_animation.querySelector('.left_dna #first'),
        left_second: bg_animation.querySelector('.left_dna #second'),
        left_third: bg_animation.querySelector('.left_dna #third'),
        right_first: bg_animation.querySelector('.right_dna #first'),
        right_second: bg_animation.querySelector('.right_dna #second'),
        right_third: bg_animation.querySelector('.right_dna #third'),
      };
      elements.push(element);

      const containers_selectors = {
        left_first: bg_animation.querySelector('.left_dna #first_container'),
        left_second: bg_animation.querySelector('.left_dna #second_container'),
        left_third: bg_animation.querySelector('.left_dna #third_container'),
        right_first: bg_animation.querySelector('.right_dna #first_container'),
        right_second: bg_animation.querySelector('.right_dna #second_container'),
        right_third: bg_animation.querySelector('.right_dna #third_container'),
      };
      containers_elements.push(containers_selectors);
    }); 
    // Function to update element positions for slow animation
    function slowAnimation() {
      const slowFactor = 33; // Adjust this value to control the speed of the slow animation (lower values make it faster)
      const rangeMultiplier = 100; // Adjust this value to increase the range of the animation

      const offsetX = Math.sin(Date.now() / (slowFactor * 100)) * rangeMultiplier;
      const offsetY = Math.cos(Date.now() / (slowFactor * 100)) * rangeMultiplier;

      elements.forEach(element => {
        // Update the styles for left elements
        element.left_first.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        element.left_second.style.transform = `translate(${offsetX / 2}px, ${offsetY / 2}px)`;
        element.left_third.style.transform = `translate(${offsetX / 3}px, ${offsetY / 3}px)`;

        // Update the styles for right elements
        element.right_first.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
        element.right_second.style.transform = `translate(${-offsetX / 2}px, ${-offsetY / 2}px)`;
        element.right_third.style.transform = `translate(${-offsetX / 3}px, ${-offsetY / 3}px)`;
      });
    }

    // Event listener for mousemove
    window.addEventListener('mousemove', (mouse_e) => {
      containers_elements.forEach(element => {
        // Update the styles for left elements based on mouse position
        element.left_first.style.transform = `translate(-${mouse_e.x / 25}px, -${mouse_e.y / 25}px)`;
        element.left_second.style.transform = `translate(-${mouse_e.x / 45}px, -${mouse_e.y / 45}px)`;
        element.left_third.style.transform = `translate(-${mouse_e.x / 15}px, -${mouse_e.y / 15}px)`;

        // Update the styles for right elements based on mouse position
        element.right_first.style.transform = `translate(-${mouse_e.x / 45}px, -${mouse_e.y / 45}px)`;
        element.right_second.style.transform = `translate(-${mouse_e.x / 25}px, -${mouse_e.y / 25}px)`;
        element.right_third.style.transform = `translate(-${mouse_e.x / 15}px, -${mouse_e.y / 15}px)`;
      });
    });

    // Initial call to start the faster slow animation
    setInterval(slowAnimation, 16);

  })

  return (
    <div className={`section_content ${props.css_class ? props.css_class : ''}`} data-floating-nav={props.floatingNav}>
      {props.has_video ? (
        <video src={HomeBackgroundVideo} autoPlay loop playsInline muted className='bg_video'></video>
      ) : (
        <div className='section_inner animating_bg'>
          <div className="left_dna">
            <BgLeft />
          </div>
          <div className="right_dna">
            <BgRight />
          </div>
        </div>
      )}
      <div className="section_inner">
        {props.title && (
          <h2 dangerouslySetInnerHTML={{ __html: props.title }} />
        )}
        {props.paragraph && (
          <div className='paragraph' dangerouslySetInnerHTML={{ __html: props.paragraph }}></div>
        )}
        {props.section_img && (
          <Image src={props.section_img} className='section_img' alt='Section Image' />
        )}
        {props.button && props.buttonLink && (
          <Link
            href={props.buttonLink}
            className='cta' >
            {props.button}
          </Link>
        )}
      </div>  
      <ScrollDown className={`scroll_down ${props.isLast}`} onClick={() => handleLinkClick()} />
    </div>
  )
}