import React from 'react'

const HomeCard = ({cardData}) => {
  return (
    <div className='flex w-full flex-col items-center gap-[18px] md:gap-[44px] border-[#D5D5D540]'>
        <img className='w-[70%] md:w-full' src={cardData.image} alt="" />
        <div className='flex w-full md:ps-[24px] items-center md:items-start flex-col gap-[16px['>
            <div className='flex gap-[10px] items-center'><div className='w-[44px] h-[44px] rounded-[44px] bg-[#F9F9F9]'></div><span className='font-[600[ text-[20px] text-[#030812]'>{cardData.head}</span></div>
            <span className='font-[400] md:text-start text-center text-[16px] text-[#475467]'>{cardData.body}</span>
        </div>
    </div>
  )
}

export default HomeCard