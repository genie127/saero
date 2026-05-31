'use client'
import 'swiper/swiper.css'
import './dashbord.scss'
import { Swiper, SwiperSlide } from "swiper/react"
import { SlideFirst } from "./slideFirst/SlideFirst.component"
import { SlideSecond } from "./slideSecond/SlideSecond.component"
import { SlideThird } from "./slideThird/SlideThird.component"
import Image from 'next/image'

export const Dashboard =()=>{
    return(
        <div className='dashboard'>
            <p>날짜</p>
            <Swiper className='swiper'>
                <SwiperSlide>
                    <SlideFirst/>
                </SwiperSlide>
                <SwiperSlide>
                    <SlideSecond/>
                </SwiperSlide>
                <SwiperSlide>
                    <SlideThird/>
                </SwiperSlide>
            </Swiper>
            <div className="icon_hand">
                <Image src={'/images/dashboard/ico_hand.png'}
                width={100}
                height={100}
                alt={'손'}

            ></Image></div>
        </div>
    )
}