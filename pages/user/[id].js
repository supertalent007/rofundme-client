import Layout from "@/components/layout/Layout"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import 'react-tabs/style/react-tabs.css';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function User() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [createdProjects, setCreatedProjects] = useState([]);
    const [backedProjects, setBackedProjects] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        axios
            .get(`${BACKEND_API}/users/single/${router.query.id}`)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get(`${BACKEND_API}/projects/created/${router.query.id}`)
            .then(res => {
                setCreatedProjects(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        axios
            .get(`${BACKEND_API}/projects/backed/${router.query.id}`)
            .then(res => {
                setBackedProjects(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [router.query.id]);

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="single-project relative themesflat-container mb-30">
                    <div className="flex row wrapper-content justify-center">
                        <div className='col-md-4 mb-30 mt-30 profile flex flex-col align-center justify-center'>
                            <img
                                src={user?.avatar}
                                alt="User Avatar"
                                style={{
                                    width: '200px !important',
                                    height: '200px !important',
                                    objectFit: 'fill',
                                    borderRadius: '50%'
                                }}
                            />
                            <div className="user-info mt-3 flex flex-col align-center justify-center">
                                <h3>{user?.name}</h3>
                                <label className="mt-2">Joined {new Date(user?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</label>
                            </div>

                            <div className="flex flex-col mt-4 widget-social">
                                <ul className="flex">
                                    <li><Link href="#" className="icon-facebook" /></li>
                                    <li><Link href="#" className="icon-twitter" /></li>
                                    <li><Link href="#" className="icon-vt" /></li>
                                    <li><Link href="#" className="icon-tiktok" /></li>
                                    <li><Link href="#" className="icon-youtube" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="tabs-container">
                        <ul className="tabs flex flex-row">
                            <li className={activeTab === 1 ? 'active' : ''} data-tabs="market" onClick={() => setActiveTab(1)}>
                                Created
                            </li>
                            <li className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>
                                Backed
                            </li>
                        </ul>
                        <div className="content-tabs">
                            <div id="created" className={activeTab === 1 ? "tabcontent active" : "tabcontent"}>
                                <CreatedProjects createdProjects={createdProjects} />
                            </div>
                            <div id="funded" className={activeTab === 2 ? "tabcontent active" : "tabcontent"}>
                                <BackedProjects backedProjects={backedProjects} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}


const CreatedProjects = ({ createdProjects }) => {
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
            {
                createdProjects?.length ?
                    <div className="widget-content-inner row">
                        {
                            createdProjects.map(project => {
                                return (
                                    <div className="wrap-box-card col-md-4" key={`project-${project?._id}`}>
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
                                            <h5 className="name" style={{ height: '50px', overflow: 'hidden' }}><Link href="#">
                                                {project?.title}
                                            </Link></h5>
                                            <div className="author flex items-center mt-3">
                                                <div className="avatar">
                                                    <img src={project?.userId?.avatar} alt="Image" />
                                                </div>
                                                <div className="info">
                                                    <span>Created by:</span>
                                                    <h6><Link href="author-2.html">
                                                        {project?.userId?.name}
                                                    </Link> </h6>
                                                </div>
                                                <div className="info mr-0 ml-auto">
                                                    <span>Created at:</span>
                                                    <h6>
                                                        {getTimeDifference(project?.createdAt)}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="divider" />
                                            <div className="meta-info flex items-center justify-between">
                                                <div className="view-col w-full">
                                                    <span className="primary-color">${project?.fundedAmount?.toLocaleString()}</span>
                                                    <div className="w-full h-10 bg-white border-radius-10">
                                                        <div
                                                            className="bg-secondary h-10 border-radius-10"
                                                            style={{ width: `${Math.min(100, Math.floor((project?.fundedAmount / project?.goal) * 100))}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-medium">{`${Math.floor((project?.fundedAmount / project?.goal) * 100)}% of $${project?.goal?.toLocaleString()} Raised`}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : 'No created projects'
            }
        </>
    )


}


const BackedProjects = ({ backedProjects }) => {
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
            {
                backedProjects?.length ?
                    <div className="widget-content-inner row">
                        {
                            backedProjects.map(project => {
                                return (
                                    <div className="wrap-box-card col-md-4" key={`project-${project?.project?._id}`}>
                                        <div className="tf-card-box style-1">
                                            <div className="card-media">
                                                <Link href="#">
                                                    <img src={project?.project?.image} alt="" />
                                                </Link>
                                                <span className="wishlist-button icon-heart" />
                                                <div className="button-place-bid">
                                                    <a href={`/project/${project?.project?._id}`} className="tf-button"><span>Funding</span></a>
                                                </div>
                                            </div>
                                            <h5 className="name" style={{ height: '50px', overflow: 'hidden' }}><Link href="#">
                                                {project?.project?.title}
                                            </Link></h5>
                                            <div className="author flex items-center mt-3">
                                                <div className="avatar">
                                                    <img src={project?.user?.avatar} alt="Image" />
                                                </div>
                                                <div className="info">
                                                    <span>Created by:</span>
                                                    <h6><Link href="author-2.html">
                                                        {project?.user?.name}
                                                    </Link> </h6>
                                                </div>
                                                <div className="info mr-0 ml-auto">
                                                    <span>Created at:</span>
                                                    <h6>
                                                        {getTimeDifference(project?.project?.createdAt)}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="divider" />
                                            <div className="meta-info flex items-center justify-between">
                                                <div className="view-col w-full">
                                                    <span className="primary-color">${project?.project?.fundedAmount?.toLocaleString()}</span>
                                                    <div className="w-full h-10 bg-white border-radius-10">
                                                        <div
                                                            className="bg-secondary h-10 border-radius-10"
                                                            style={{ width: `${Math.min(100, Math.floor((project?.project?.fundedAmount / project?.project?.goal) * 100))}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-medium">{`${Math.floor((project?.project?.fundedAmount / project?.project?.goal) * 100)}% of $${project?.project?.goal?.toLocaleString()} Raised`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : 'No funded projects'
            }
        </>
    )


}
