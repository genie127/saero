'use client'
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

export const Dashboard =()=>{
    return(
        <>
            <Swiper >
                <SwiperSlide>
                    <Image
                        src={'/images/dashboard/sl01_img.png'}
                        width={257}
                        height={236}
                        alt={'슬라이드이미지01'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={'/images/dashboard/sl02_img.png'}
                        width={257}
                        height={236}
                        alt={'슬라이드이미지02'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={'/images/dashboard/sl03_img.png'}
                        width={257}
                        height={236}
                        alt={'슬라이드이미지03'}
                    />
                </SwiperSlide>
            </Swiper>
        </>
    )
}