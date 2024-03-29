import React, { useContext } from 'react';
import ScrollNavIcon from '../media/scroll_nav_icon.svg';
import { SwiperContext } from '../components/SwiperContext';


export default function ScrollNav({ sectionsArr }) {
  const { swiperRef } = useContext(SwiperContext);

  const handleLinkClick = (index) => { 
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      console.log(index);
    }
  };
  return (
    <div className='scrollNav'>
      <ScrollNavIcon />
      <div className="links"> 
        {sectionsArr.map(singleSection => (
          <a href="#" data-for-section={singleSection.floating_nav} key={singleSection.id} className={singleSection.id == 0 ? 'active' : undefined} onClick={() => handleLinkClick(singleSection.id)}>
            {singleSection.floating_nav_text}
          </a>
        ))}
      </div>
    </div>
  )
}