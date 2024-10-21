
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;
const MEDIA_API = process.env.NEXT_PUBLIC_SERVER_URL;

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    breakpoints: {
        600: {
            slidesPerView: 2
        },
        991: {
            slidesPerView: 3
        }
    }
}
export default function TopProjects() {
    const [topProjects, setTopProjects] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_API}/projects/top`)
            .then(res => {
                setTopProjects(res.data);
            })
    }, []);

    return (
        <>
            <div className="tf-section top-collections">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-section pb-20">
                                <h2 className="tf-title ">Top projects</h2>
                                <Link href="/explore-3" >Discover more <i className="icon-arrow-right2" /></Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Swiper {...swiperOptions} className="featured pt-10 swiper-container carousel3">
                                <div className="swiper-wrapper">
                                    {
                                        topProjects?.length ?
                                            topProjects.map(topProject => {
                                                return (
                                                    <SwiperSlide key={`top-project-${topProject._id}`}>
                                                        <div className="tf-card-collection">
                                                            <Link href={`/project/${topProject?._id}`}>
                                                                <div className="media-images-collection">
                                                                    <img src={`${topProject?.image}`} alt="" style={{ height: '162px', width: '162px' }} />
                                                                    {
                                                                        topProject?.thumbs?.length ?
                                                                            topProject?.thumbs.slice(0, 3).map(thumb => {
                                                                                return (
                                                                                    <img src={`${MEDIA_API}/${thumb?.filePath}`} alt="" style={{ height: '162px', width: '162px' }} />
                                                                                )
                                                                            }) : ''
                                                                    }
                                                                    <div className="author-poster">
                                                                        <img src={topProject?.userId?.avatar} alt="" className="w-full" style={{ height: '100%' }} />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="card-bottom">
                                                                <div className="author">
                                                                    <h5><Link href={`/users/${topProject?.userId?._id}`}>{topProject?.userId?.name}</Link></h5>
                                                                    <div className="infor">{topProject?.userId?.country}</div>
                                                                </div>
                                                                <div className="bottom-right">
                                                                    <div className="shop">
                                                                        <div className="icon">
                                                                            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M16.875 6.25L16.3542 15.11C16.3261 15.5875 16.1166 16.0363 15.7685 16.3644C15.4204 16.6925 14.96 16.8752 14.4817 16.875H5.51833C5.03997 16.8752 4.57962 16.6925 4.23152 16.3644C3.88342 16.0363 3.6739 15.5875 3.64583 15.11L3.125 6.25M8.33333 9.375H11.6667M2.8125 6.25H17.1875C17.705 6.25 18.125 5.83 18.125 5.3125V4.0625C18.125 3.545 17.705 3.125 17.1875 3.125H2.8125C2.295 3.125 1.875 3.545 1.875 4.0625V5.3125C1.875 5.83 2.295 6.25 2.8125 6.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                        <p>${topProject?.fundedAmount?.toLocaleString()}</p>
                                                                    </div>
                                                                    <div className="like">
                                                                        <span className="wishlist-button icon-heart" />
                                                                        <p>97 like</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>

                                                )
                                            }) : ''
                                    }
                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
