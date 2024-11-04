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
    const [latestTransactions, setLatestTransactions] = useState([]);

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

        axios.get(`${BACKEND_API}/transactions/${userId}`)
            .then(res => {
                setTransactions(res.data);
            })

        axios
            .get(`${BACKEND_API}/transactions/latest`)
            .then(res => {
                setLatestTransactions(res.data);
            })
            .catch(err => {
                console.error('Failed to get transaction data:', err);
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
                            <Link href="/project-create" className="tf-button style-2 h50 w230">Create your first Project</Link>
                        </div>
                        <div className="bg-home7">
                            <AutoSlider1 />
                            <AutoSlider2 />
                            <AutoSlider1 />
                        </div>
                    </div>
                    <div className="heading-section">
                        <h2 className="tf-title style-1 pb-30">Transaction History</h2>
                        <div data-wow-delay="0s" className="wow fadeInUp col-12 overflow-auto">
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
                        recentProjects.length ?
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
                                                            <h6><Link href={`/project/${project?._id}`}>{project?.title ? project.title.substring(0, 10) + (project.title.length > 10 ? '…' : '') : ''}</Link></h6>
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
                            </div> : ''
                    }
                    {
                        topCreators.length ?
                            <div className="widget widget-creators">
                                <div className="flex items-center justify-between">
                                    <h5 className="title-widget">Top Creators</h5>
                                    <Link className="see-all" href="#">See all</Link>
                                </div>
                                {
                                    topCreators.map((creator, index) => {
                                        return (
                                            <div className="widget-creators-item flex items-center mb-20">
                                                <div className="order">{index + 1}. </div>
                                                <div className="author flex items-center flex-grow">
                                                    <img src={creator?.avatar} alt="" />
                                                    <div className="info">
                                                        <h6><Link href={`/user/${creator?._id}`}>{creator?.name}</Link></h6>
                                                    </div>
                                                </div>
                                                <button className="follow">Follow</button>
                                            </div>
                                        )
                                    })
                                }
                            </div> : ''
                    }
                    {
                        latestTransactions?.length ?
                            <div className="widget widget-history">
                                <div className="flex items-center justify-between">
                                    <h5 className="title-widget">History</h5>
                                    <Link className="see-all" href="#">See all</Link>
                                </div>
                                {
                                    latestTransactions?.map(transaction => {
                                        return (
                                            <div className="widget-creators-item flex items-center mb-20" key={`transaction-${transaction?._id}`}>
                                                <div className="author flex items-center flex-grow">
                                                    <img src={transaction?.projectId?.image} alt="" />
                                                    <div className="info">
                                                        <h6 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 'max-content' }}>
                                                            <Link href="#" style={{ display: 'inline-block', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                {transaction?.projectId?.title ? transaction.projectId.title.substring(0, 16) + (transaction.projectId.title.length > 16 ? '…' : '') : ''}
                                                            </Link>
                                                        </h6>
                                                        <span><Link href="#">Funded ${transaction?.amount}</Link></span>
                                                    </div>
                                                </div>
                                                <span className="date">
                                                    {getTimeDifference(transaction?.projectId?.createdAt)}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div> : ''
                    }
                </div>
            </div>

            <BidModal handleBidModal={handleBidModal} isBidModal={isBidModal} />
        </>
    )
}