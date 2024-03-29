import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

//------// Media //------//
import RightArrow from '../media/svgs/arrow-right.svg';
import LeftArrow from '../media/svgs/arrow-left.svg';

export default function TableSlider(props) {
  const { slides_data } = props;

  // Function to chunk the array into groups of 3 rows
  const chunkArray = (arr, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  // Split slides_data into groups of 3 rows each
  const chunkedSlidesData = chunkArray(slides_data, 3);

  return (
    <div className="table_slider">
      <Swiper 
        spaceBetween={32} 
        slidesPerView={2}
        modules={[Navigation]}
        navigation={{
          nextEl: ".slide_next",
          prevEl: ".slide_prev", 
          disabledClass: "sl_disabled"
        }}
      >
        {chunkedSlidesData.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="slide_content">
              {chunk.map((single_row) => (
                <div key={single_row.id} className='slide_row'> 
                    <div className="row_left">
                        {single_row.image}
                        {single_row.text && (
                            <span>{single_row.text}</span>
                        )}
                    </div>
                    <div className={`row_right ${single_row.status}`}>
                        {single_row.status}
                    </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
        <div className="sl_navigation">
            <div className="slide_next">
                <LeftArrow />
            </div>
            <div className="slide_prev">
                <RightArrow />
            </div>
        </div>
      </Swiper>
    </div>
  );
}
