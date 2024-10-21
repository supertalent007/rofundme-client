import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { useEffect, useState } from "react"
import BidModal from '../elements/BidModal'
import AutoSlider1 from '../slider/AutoSlider1'
import AutoSlider2 from '../slider/AutoSlider2'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function History({ activeIndex }) {
    const [isBidModal, setBidModal] = useState(false)
    const handleBidModal = () => setBidModal(!isBidModal)
    const [recentProjects, setRecentProjects] = useState([]);
    const [topCreators, setTopCreators] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_API}/projects/recent`)
            .then(res => {
                setRecentProjects(res.data);
            });

        axios.get(`${BACKEND_API}/users/top_creators`)
            .then(res => {
                setTopCreators(res.data);
            })

        const userId = jwtDecode(localStorage.getItem('token')).id;

        axios.get(`${BACKEND_API}/transactions?userId=${userId}`)
            .then(res => {
                setTransactions(res.data);
            })
    }, [activeIndex]);



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
                        <h2 className="tf-title style-1 pb-30">Transaction History</h2>
                        <div data-wow-delay="0s" className="wow fadeInUp col-12">
                            <div className="product-item item-activity mb-0">
                                <h6><i className="icon-two-arrow rotateZ90" />Transactions</h6>
                                <i className="icon-keyboard_arrow_down" />
                                <div className="content">
                                    <div className="table-heading">
                                        <div className="column">Event</div>
                                        <div className="column">Price</div>
                                        <div className="column">To</div>
                                        <div className="column">Date</div>
                                    </div>
                                    {
                                        transactions?.length ?
                                            transactions.map((transaction, index) => {
                                                return (
                                                    <div className="table-item">
                                                        <div className="column flex items-center"><i className="icon-two-arrow" />Transfer</div>
                                                        <div className="column">${transaction?.amount}</div>
                                                        <a className="column" href={`/project/${transaction?.projectId?._id}`}><span className="tf-color">{transaction?.projectId?.title}</span></a>
                                                        <div className="column">{getTimeDifference(transaction?.createdAt)}</div>
                                                    </div>
                                                )
                                            })
                                            : ''
                                    }
                                </div>
                            </div>
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