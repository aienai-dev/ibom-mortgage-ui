import React from 'react';

const Carousel = () => {
 const img1 = "https://res.cloudinary.com/dzquobiiy/image/upload/v1724156285/Frame_1000002366_ybike1.svg";
 const img2 = "https://res.cloudinary.com/dzquobiiy/image/upload/v1724156256/Frame_1000002361_dempaz.svg";
 const img3 = "https://res.cloudinary.com/dzquobiiy/image/upload/v1724156260/Frame_1000002369_kxpkpr.svg";
 const img4 = "https://res.cloudinary.com/dzquobiiy/image/upload/v1724156254/Frame_1000002368_j8tdlu.svg";
  return (
    <div className="w-full flex overflow-hidden mx-[20px] max-w-[1240px] gap-[20px]">
     <img src={img1} alt="" />
     <img src={img2} alt="" />
     <img src={img3} alt="" />
     <img src={img4} alt="" />
    </div>
  )
}

export default Carousel