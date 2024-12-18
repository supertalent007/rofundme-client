import Link from "next/link"
import { Autoplay, EffectCoverflow, FreeMode, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import BidModal from "../elements/BidModal"
import { IconCoin } from "@tabler/icons-react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation, FreeMode, EffectCoverflow],
    loop: true,
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    freeMode: true,
    watchSlidesProgress: true,
    effect: "coverflow",
    grabCursor: true,
    coverflowEffect: {
        rotate: 15,
        stretch: 90,
        depth: 0,
        modifier: 1,
        scale: 0.9,
        slideShadows: false,
    },
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    navigation: {
        nextEl: ".next-3d",
        prevEl: ".prev-3d",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span className="' + + '">' + (index + 1) + '</span>'
        },
    },
    breakpoints: {
        500: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        },
        1400: {
            slidesPerView: 5,
        },
    },
}

import Countdown from '@/components/elements/Countdown'
import { useState } from "react"

export default function TitileSlider1() {
    const [isBidModal, setBidModal] = useState(false)
    const handleBidModal = () => setBidModal(!isBidModal)
    const currentTime = new Date()
    const timerx = <Countdown endDateTime={currentTime.setDate(currentTime.getDate() + 2)} />
    return (
        <>
            <Swiper {...swiperOptions} className="swiper swiper-3d-7 swiper-container-horizontal">
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-1.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0.55</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-2.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-3.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-4.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-5.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-4.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-3.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-2.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-1.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-5.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-4.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-3.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-2.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tf-card-box">
                        <div className="card-media">
                            <Link href="#">
                                <img src="/assets/images/box-item/ad-1.png" alt="" />
                            </Link>
                            <span className="wishlist-button icon-heart" />
                            <div className="featured-countdown">
                                {timerx}
                            </div>
                            {/* <div className="button-place-bid">
                                <a onClick={handleBidModal} href="#" className="tf-button"><span>fund</span></a>
                            </div> */}
                        </div>
                        {/* <div className="meta-info text-center">
                            <h5 className="name"><Link href="#">Dayco serpentine belt</Link></h5>
                            <h6 className="price gem flex center justify-center"><IconCoin />0,34</h6>
                        </div> */}
                    </div>
                </SwiperSlide>

                <div className="swiper-pagination pagination-number" />
            </Swiper>
            <div className="swiper-button-next next-3d over" />
            <div className="swiper-button-prev prev-3d over" />
            {/* <BidModal handleBidModal={handleBidModal} isBidModal={isBidModal} /> */}

        </>
    )
}
