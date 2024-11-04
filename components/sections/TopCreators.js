import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: false,
    slidesPerView: 2,
    observer: true,
    grabCursor: true,
    observeParents: true,
    spaceBetween: 30,
    autoplay: {
        delay: 2700,
        disableOnInteraction: false
    },
    navigation: {
        clickable: true,
        nextEl: '.seller-next',
        prevEl: '.seller-prev'
    },
    breakpoints: {
        500: {
            slidesPerView: 3
        },
        640: {
            slidesPerView: 4
        },
        768: {
            slidesPerView: 5
        },
        1070: {
            slidesPerView: 6
        }
    }
}


import Link from "next/link"
import HoverDropdown from "../elements/HoverDropdown"
export default function TopCreators({ topUsers }) {
    return (
        <>

            <div className="tf-section seller ">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-section">
                                <h2 className="tf-title pb-30">Top creators
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper {...swiperOptions} className="swiper-container seller seller-slider2">
                                <div className="swiper-wrapper">
                                    {
                                        topUsers?.length ?
                                            topUsers.map((user, index) => {
                                                return (
                                                    <SwiperSlide key={`user-${index}`}>
                                                        <div className="tf-author-box text-center">
                                                            <div className="author-avatar">
                                                                <img src={user?.avatar} alt="" className="avatar" style={{
                                                                    width: '160px',
                                                                    height: '160px',
                                                                    borderRadius: '50%',
                                                                    objectFit: 'fill'
                                                                }} />
                                                                <div className="number">
                                                                    {index + 1}
                                                                </div>
                                                            </div>
                                                            <div className="author-infor ">
                                                                <h5><Link href={`/user/${user?._id}`}>
                                                                    {user?.name}
                                                                </Link></h5>
                                                                <h6 className="price gem style-1"><i className="icon-gem" />{user?.earning.toLocaleString()}</h6>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            }) : ''
                                    }
                                </div>
                            </Swiper>
                            <div className="swiper-button-next seller-next over active" />
                            <div className="swiper-button-prev seller-prev over " />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
