import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { useEffect, useState } from "react"
import BidModal from '../elements/BidModal'
import AutoSlider1 from '../slider/AutoSlider1'
import AutoSlider2 from '../slider/AutoSlider2'
import axios from 'axios'
const currentTime = new Date()

import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: false,
    slidesPerView: 1,
    spaceBetween: 26.7,
    observer: true,
    observeParents: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    navigation: {
        clickable: true,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1300: {
            slidesPerView: 2
        },
        1500: {
            slidesPerView: 3
        }
    }
}

export default function AllProjects({ activeIndex }) {
    const [isBidModal, setBidModal] = useState(false)
    const handleBidModal = () => setBidModal(!isBidModal)
    const [projects, setProjects] = useState([]);
    const [recentProjects, setRecentProjects] = useState([]);
    const [topCreators, setTopCreators] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 12;
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    const [totalNumberOfProjects, setTotalNumberOfProjects] = useState(0);
    const [sortBy, setSortBy] = useState('recent');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        axios
            .get(`${BACKEND_API}/projects/total`)
            .then(res => {
                setTotalNumberOfProjects(res.data);
                setTotalNumberOfPages(Math.ceil(res.data / projectsPerPage));
            })


        axios.get(`${BACKEND_API}/projects/recent`)
            .then(res => {
                setRecentProjects(res.data);
            });

        axios.get(`${BACKEND_API}/users/top_creators`)
            .then(res => {
                setTopCreators(res.data);
            })
    }, [activeIndex]);

    useEffect(() => {
        axios
            .get(`${BACKEND_API}/projects?projectsPerPage=${projectsPerPage}&currentPage=${currentPage}&sortBy=${sortBy}&category=${category}`)
            .then(res => {
                setProjects(res.data);
            })
            .catch(err => {
                console.log('Something went wrong.')
            });
    }, [sortBy, currentPage, category]);

    const categories = [
        'Action',
        'Adventure',
        'Fantasy',
        'Obby',
        'Racing',
        'RolePlay',
        'RPG',
        'Shooter/FPS',
        'Simulator',
        'Survival'
    ];

    function getTimeDifference(isoString) {
        const now = new Date();
        const dateCreated = new Date(isoString);

        const diffInMs = now - dateCreated;

        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        }

        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        return dateCreated.toLocaleDateString('en-US', options);
    }

    return (
        <>
            <div className="wrapper-content">
                <div className="inner-content">
                    <div className="action__body w-full mb-40">
                        <div className="tf-tsparticles">
                            <div id="tsparticles1" data-color="#161616" data-line="#000" />
                        </div>
                        <h2>Discover, Fund, and Launch Roblox Game</h2>
                        <div className="flat-button flex">
                            <Link href="#" className="tf-button style-2 h50 w190 mr-10">Explore now<i className="icon-arrow-up-right2" /></Link>
                            <Link href="#" className="tf-button style-2 h50 w230">Create your first Project<i className="icon-arrow-up-right2" /></Link>
                        </div>
                        <div className="bg-home7">
                            <AutoSlider1 />
                            <AutoSlider2 />
                            <AutoSlider1 />
                        </div>
                    </div>
                    <div className="heading-section">
                        <h2 className="tf-title style-1 pb-30">Projects</h2>
                        <div className="tf-soft">
                            <div className="soft-right flex mr-0 ml-auto gap20">
                                <Menu as="div" className="dropdown">
                                    <Menu.Button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
                                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.875 6.25L16.3542 15.11C16.3261 15.5875 16.1166 16.0363 15.7685 16.3644C15.4204 16.6925 14.96 16.8752 14.4817 16.875H5.51833C5.03997 16.8752 4.57962 16.6925 4.23152 16.3644C3.88342 16.0363 3.6739 15.5875 3.64583 15.11L3.125 6.25M8.33333 9.375H11.6667M2.8125 6.25H17.1875C17.705 6.25 18.125 5.83 18.125 5.3125V4.0625C18.125 3.545 17.705 3.125 17.1875 3.125H2.8125C2.295 3.125 1.875 3.545 1.875 4.0625V5.3125C1.875 5.83 2.295 6.25 2.8125 6.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="inner">Category</span>
                                    </Menu.Button>
                                    <Menu.Items as="div" className="dropdown-menu d-block" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" onClick={e => setCategory('All')}>
                                            <div className={"sort-filter " + (category === 'All' ? 'active' : '')}>
                                                <span>All</span>
                                                <span className="icon-tick"><span className="path2" /></span>
                                            </div>
                                        </a>
                                        {
                                            categories.map((subCategory, index) => {
                                                return (
                                                    <a className="dropdown-item" key={`cateogry-${index}`} onClick={e => setCategory(subCategory)}>
                                                        <div className={"sort-filter " + (category === subCategory ? 'active' : '')}>
                                                            <span>{subCategory}</span>
                                                            <span className="icon-tick"><span className="path2" /></span>
                                                        </div>
                                                    </a>
                                                )
                                            })
                                        }
                                    </Menu.Items>
                                </Menu>
                                <Menu as="div" className="dropdown">
                                    <Menu.Button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton4" aria-haspopup="true" aria-expanded="false">
                                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 5V15M7.5 12.6517L8.2325 13.2008C9.20833 13.9333 10.7908 13.9333 11.7675 13.2008C12.7442 12.4683 12.7442 11.2817 11.7675 10.5492C11.28 10.1825 10.64 10 10 10C9.39583 10 8.79167 9.81667 8.33083 9.45083C7.40917 8.71833 7.40917 7.53167 8.33083 6.79917C9.2525 6.06667 10.7475 6.06667 11.6692 6.79917L12.015 7.07417M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Sort by: {sortBy}</span>
                                    </Menu.Button>
                                    <Menu.Items as="div" className="dropdown-menu d-block" aria-labelledby="dropdownMenuButton">
                                        <h6>Sort by</h6>
                                        <Link href="#" className="dropdown-item" onClick={e => setSortBy('recent')}>
                                            <div className="sort-filter" href="#">
                                                <span>Recently added</span>
                                                <span className="icon-tick"><span className="path2" /></span>
                                            </div>
                                        </Link>
                                        <Link href="#" className="dropdown-item" onClick={e => setSortBy('increase')}>
                                            <div className="sort-filter" href="#">
                                                <span>Price: Low to High</span>
                                                <span className="icon-tick"><span className="path2" /></span>
                                            </div>
                                        </Link>
                                        <Link href="#" className="dropdown-item" onClick={e => setSortBy('decrease')}>
                                            <div className="sort-filter" href="#">
                                                <span>Price: High to Low</span>
                                                <span className="icon-tick"><span className="path2" /></span>
                                            </div>
                                        </Link>
                                    </Menu.Items>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="widget-tabs relative">
                        <div className="widget-content-tab" id="recent-project">
                            <div className="widget-content-inner row">
                                {
                                    projects.length &&
                                    projects.map((project, index) => (
                                        <div className="wrap-box-card col-4" key={`project-${index}`}>
                                            <div className="col-item">
                                                <div className="tf-card-box style-1">
                                                    <div className="card-media">
                                                        <Link href="#">
                                                            <img src={project?.image} alt="" />
                                                        </Link>
                                                        <span className="wishlist-button icon-heart" />
                                                        <div className="button-place-bid">
                                                            <a href={`/project/${project?._id}`} className="tf-button"><span>Funding</span></a>
                                                        </div>
                                                    </div>
                                                    <h5 className="name" ><Link href="#">
                                                        {project?.title}
                                                    </Link></h5>
                                                    <div className="author flex items-center mt-3">
                                                        <div className="avatar">
                                                            <img src="assets/images/avatar/avatar-box-03.jpg" alt="Image" />
                                                        </div>
                                                        <div className="info">
                                                            <span>Created by:</span>
                                                            <h6><Link href="author-2.html">
                                                                {project?.userId?.name}
                                                            </Link> </h6>
                                                        </div>
                                                    </div>
                                                    <div className="divider" />
                                                    <div className="meta-info flex items-center justify-between">
                                                        <span className="text-bid">Goal</span>
                                                        <h6 className="price gem"><i className="icon-gem" />{project?.goal}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                totalNumberOfPages > 1 &&
                                <div className="col-12">
                                    <div className="widget-pagination">
                                        <ul className="justify-center">
                                            <li>
                                                <Link href="#"><i className="icon-keyboard_arrow_left" /></Link>
                                            </li>
                                            {
                                                Array
                                                    .from({ length: totalNumberOfPages }, (_, index) => index + 1)
                                                    .map(page => {
                                                        return (
                                                            <li className="active" key={`page-${page}`} >
                                                                <Link href="#">{page}</Link>
                                                            </li>
                                                        )
                                                    })
                                            }
                                            {
                                                totalNumberOfPages > 4 &&
                                                <li>
                                                    <Link href="#">...</Link>
                                                </li>
                                            }
                                            <li>
                                                <Link href="#"><i className="icon-keyboard_arrow_right" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="side-bar">
                    {
                        recentProjects.length &&
                        <div className="widget widget-recently">
                            <h5 className="title-widget">Recently added</h5>
                            <div className="card-small-main">
                                <img src={recentProjects[0].image} alt="" />
                                <div className="card-bottom">
                                    <h5><Link href="#">
                                        {recentProjects[0].title}
                                    </Link></h5>
                                    <span className="date">{getTimeDifference(recentProjects[0].createdAt)}</span>
                                </div>
                            </div>
                            {
                                recentProjects.map((project, index) => {
                                    if (index && index <= 5) {
                                        return (
                                            <div className="card-small" key={`recent-project-${index}`}>
                                                <div className="author">
                                                    <img src={project?.image} alt="" width='100px' />
                                                    <div className="info">
                                                        <h6><Link href="#">{project?.title}</Link></h6>
                                                        <p><Link href="#">{project?.userId?.name}</Link></p>
                                                    </div>
                                                </div>
                                                <span className="date">
                                                    {getTimeDifference(project.createdAt)}
                                                </span>
                                            </div>
                                        )
                                    }

                                })
                            }
                        </div>
                    }
                    <div className="widget widget-creators">
                        <div className="flex items-center justify-between">
                            <h5 className="title-widget">Top Creators</h5>
                            <Link className="see-all" href="#">See all</Link>
                        </div>
                        {
                            topCreators.length &&
                            topCreators.map((creator, index) => {
                                return (
                                    <div className="widget-creators-item flex items-center mb-20">
                                        <div className="order">{index + 1}. </div>
                                        <div className="author flex items-center flex-grow">
                                            <img src={creator?.avatar} alt="" />
                                            <div className="info">
                                                <h6><Link href="#">{creator?.name}</Link></h6>
                                            </div>
                                        </div>
                                        <button className="follow">Follow</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="widget widget-history">
                        <div className="flex items-center justify-between">
                            <h5 className="title-widget">History</h5>
                            <Link className="see-all" href="#">See all</Link>
                        </div>
                        <div className="widget-creators-item flex items-center mb-20">
                            <div className="author flex items-center flex-grow">
                                <img src="assets/images/avatar/avatar-small-01.png" alt="" />
                                <div className="info">
                                    <h6><Link href="#">Lorem NFT sold</Link></h6>
                                    <span><Link href="#">Sold at 1.32 ETH</Link></span>
                                </div>
                            </div>
                            <span className="time">Just now</span>
                        </div>
                        <div className="widget-creators-item flex items-center mb-20">
                            <div className="author flex items-center flex-grow">
                                <img src="assets/images/avatar/avatar-small-02.png" alt="" />
                                <div className="info">
                                    <h6><Link href="#">New NFT uploaded</Link></h6>
                                    <span><Link href="#">By Marisol Pena</Link></span>
                                </div>
                            </div>
                            <span className="time">1hr ago</span>
                        </div>
                        <div className="widget-creators-item flex items-center mb-20">
                            <div className="author flex items-center flex-grow">
                                <img src="assets/images/avatar/avatar-small-03.png" alt="" />
                                <div className="info">
                                    <h6><Link href="#">You followed a creator</Link></h6>
                                    <span><Link href="#">Jane Cooper</Link></span>
                                </div>
                            </div>
                            <span className="time">2hr ago</span>
                        </div>
                        <div className="widget-creators-item flex items-center mb-20">
                            <div className="author flex items-center flex-grow">
                                <img src="assets/images/avatar/avatar-small-04.png" alt="" />
                                <div className="info">
                                    <h6><Link href="#">You placed a bid</Link></h6>
                                    <span><Link href="#">Whirl wind NFT</Link></span>
                                </div>
                            </div>
                            <span className="time">4hr ago</span>
                        </div>
                        <div className="widget-creators-item flex items-center">
                            <div className="author flex items-center flex-grow">
                                <img src="assets/images/avatar/avatar-small-01.png" alt="" />
                                <div className="info">
                                    <h6><Link href="#">You followed a creator</Link></h6>
                                    <span><Link href="#">Courtney Henry</Link></span>
                                </div>
                            </div>
                            <span className="time">16hr ago</span>
                        </div>
                    </div>
                </div>
            </div>

            <BidModal handleBidModal={handleBidModal} isBidModal={isBidModal} />
        </>
    )
}