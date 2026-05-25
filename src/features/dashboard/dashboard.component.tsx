'use client'
import 'swiper/swiper.css'

import { Swiper, SwiperSlide } from "swiper/react"
import { SlideFirst } from "./slideFirst/SlideFirst.component"
import { SlideSecond } from "./slideSecond/SlideSecond.component"
import { SlideThird } from "./slideThird/SlideThird.component"

export const Dashboard =()=>{
    return(
        <>
            <Swiper >
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
        </>
    )
}