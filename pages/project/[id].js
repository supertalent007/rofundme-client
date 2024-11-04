import Layout from "@/components/layout/Layout"
import Campaign from "@/components/sections/Campaign";
import Rewards from "@/components/sections/Rewards";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { jwtDecode } from 'jwt-decode';
import { formatDistanceToNowStrict, addDays } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;
const MEDIA_API = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Custom404() {
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [numberOfBackers, setNumberOfBackers] = useState(0);
    const [user, setUser] = useState(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        axios
            .get(`${BACKEND_API}/users/single/${jwtDecode(localStorage.getItem('token')).id}`)
            .then(res => {
                setUser(res.data);
            })

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        axios
            .get(`${BACKEND_API}/projects/single/${router.query.id}`)
            .then(res => {
                setProject(res.data[0]);
            })

        if (router.query.id) {
            axios
                .get(`${BACKEND_API}/projects/get_number_of_backers_for_project/${router.query.id}`)
                .then(res => {
                    setNumberOfBackers(res.data.numberOfBackers);
                })
        }
    }, [router.query.id]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const calculateDaysLeft = () => {
        if (!project?.createdAt || !project?.duration) {
            return null;
        }

        const createdAtDate = new Date(project.createdAt);

        const projectEndDate = addDays(createdAtDate, project.duration);

        const daysLeft = formatDistanceToNowStrict(projectEndDate, { unit: 'day' });

        return daysLeft;
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="single-project relative themesflat-container">
                    <div className="single-project-header">
                        <h2>{project?.title}</h2>

                        <div className="row">
                            <div className={isMobile ? 'col-md-12' : 'col-8'}>
                                <img src={project?.image} alt="" style={{ borderRadius: '5px' }} />
                            </div>

                            <div className={isMobile ? 'col-md-12' : 'col-4'}>
                                <div className="info-section">
                                    <div className="header-line" />
                                    <div className="view-col">
                                        <span>{numberOfBackers}</span>
                                        <span>backers</span>
                                    </div>
                                    <div className="view-col">
                                        <span>{calculateDaysLeft()}</span>
                                        <span>days to go</span>
                                    </div>
                                    <div className="view-col">
                                        <span className="primary-color">${project?.fundedAmount?.toLocaleString()}</span>
                                        <div className="w-full h-10 bg-white border-radius-10">
                                            <div
                                                className="bg-secondary h-10 border-radius-10"
                                                style={{ width: `${Math.floor((project?.fundedAmount / project?.goal) * 100)}%` }}
                                            />
                                        </div>
                                        <span className="font-medium">{`${Math.floor((project?.fundedAmount / project?.goal) * 100)}% of $${project?.goal?.toLocaleString()} Raised`}</span>
                                    </div>
                                </div>
                                <div className="widget-social mt-5 mb-5">
                                    <ul className="flex">
                                        <li><Link href="#" className="icon-facebook" /></li>
                                        <li><Link href="#" className="icon-twitter" /></li>
                                        <li><Link href="#" className="icon-vt" /></li>
                                        <li><Link href="#" className="icon-tiktok" /></li>
                                        <li><Link href="#" className="icon-youtube" /></li>
                                    </ul>
                                </div>
                                <button className="tf-button force-w-full" onClick={e => setIsModalOpen(true)}>
                                    PICK YOUR PERK
                                </button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <HtmlRenderer htmlContent={project?.description} />

                        </div>

                        {isModalOpen ?
                            <RewardModal
                                closeModal={closeModal}
                                project={project}
                                user={user}
                            /> : ''
                        }

                    </div>

                    <div className="single-project-details">
                        <Tabs>
                            <TabList>
                                <Tab style={{ fontSize: '20px' }}>Campaign</Tab>
                                <Tab style={{ fontSize: '20px' }}>Rewards</Tab>
                            </TabList>

                            <TabPanel>
                                <Campaign project={project} HtmlRenderer={HtmlRenderer} />
                            </TabPanel>
                            <TabPanel>
                                <Rewards project={project} isMobile={isMobile} user={user} />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>


            </Layout>
        </>
    )
}

function HtmlRenderer({ htmlContent }) {
    return (
        <div
            className="description-display"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}

function RewardModal({ closeModal, project, user }) {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(10);

    const handleSubmit = async (reward) => {
        if (!stripe || !elements) {
            return;
        }

        if (!user.isVerified) {
            toast.warning('Must have Roblox User ID to purchase perk');
            return;
        }

        try {
            const res = await axios.post(`${BACKEND_API}/create-payment-intent`, {
                amount: reward?.amount * 100,
                product: reward?.title,
                rewardId: reward?._id,
                projectId: project?._id,
                userId: jwtDecode(localStorage.getItem('token')).id
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const checkoutUrl = res.data.url;
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    const handlePayment = async () => {
        if (!user?.isVerified) {
            toast.warning('Must have Roblox User ID to purchase perk');
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        const targetAmount = amount;

        const closestReward = project?.rewards
            ?.filter(r => r.amount <= targetAmount)
            ?.reduce((prev, curr) =>
                (targetAmount - curr.amount < targetAmount - prev.amount ? curr : prev), { amount: 0 });

        try {
            if (closestReward) {
                const res = await axios.post(`${BACKEND_API}/create-payment-intent`, {
                    amount: amount * 100,
                    product: closestReward.title,
                    rewardId: closestReward._id,
                    projectId: project?._id,
                    userId: jwtDecode(localStorage.getItem('token')).id
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                const checkoutUrl = res.data.url;
                if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                }
            } else {
                console.error('No suitable reward found.');
            }
        } catch (error) {
            console.error('Payment failed:', error);
        }
    }

    return (
        <div className="reward-modal">
            <div className="modal-content">
                <a href="#" className="mr-0 ml-auto" onClick={e => { e.preventDefault(); closeModal(); }}>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="1.5" />
                        <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </a>
                <h2>Back this project</h2>
                <div>
                    <h5>Make a contribution</h5>
                    <div className="flex mt-3 border-container align-center">
                        <span className="currency-prefix">$</span>
                        <input
                            type="number"
                            className="no-spinner mr-10 input-with-currency"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required
                        />
                        <span className="currency-suffix">USD</span>
                        <button className="tf-button" onClick={handlePayment}>CONTINUE</button>
                    </div>
                </div>
                <div className="mt-5">
                    <h5>Select An Option</h5>
                    {project?.rewards?.map((reward, index) => {
                        return (
                            <div className="flex flex-col reward-card mb-5 mt-3" key={`reward-${index}`}>
                                <img src={`${MEDIA_API}/${reward?.filePath}`} alt="File Preview" />
                                <div className="p20">
                                    <h4>{reward?.title}</h4>
                                    <div className="mt-2">${reward?.amount}</div>
                                    <div className="mt-4 basic-text">
                                        {reward?.description}
                                    </div>

                                    <button className="tf-button force-w-full mt-5" onClick={e => handleSubmit(reward)}>
                                        GET THIS PERK
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}