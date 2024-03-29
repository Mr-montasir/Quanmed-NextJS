import React, { useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function AnimatedTitle(props) {
  useEffect(() => {
    const titleAnimation = () => {
      const allTitles = document.querySelectorAll('.animatedTitle h1');
      allTitles.forEach((singleTitle) => {
        const splitTitle = new SplitType(singleTitle);
        const splittedText = singleTitle.querySelectorAll('.char');
        
        gsap.set(splittedText, { x: 3, opacity: 0 }); // Initial state

        gsap.to(splittedText, {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.2,
          duration: 0.5,
        });
      });
    };
    
    titleAnimation();
  }, [props.title]);

  return (
    <div className='animatedTitle'>
      <h1>{props.title}</h1>
    </div>
  );
}

