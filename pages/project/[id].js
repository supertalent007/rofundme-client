import Layout from "@/components/layout/Layout"
import Campaign from "@/components/sections/Campaign";
import Rewards from "@/components/sections/Rewards";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;
const MEDIA_API = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Custom404() {
    const router = useRouter();
    const [project, setProject] = useState({});
    const [activeTab, setActiveTab] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`${BACKEND_API}/projects/single/${router.query.id}`)
            .then(res => {
                setProject(res.data[0]);
            })
    }, [router.query.id]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="single-project relative themesflat-container">
                    <div className="single-project-header">
                        <h2>{project?.title}</h2>

                        <div className="row">
                            <div className="col-8">
                                <img src={project?.image} alt="" style={{ borderRadius: '5px' }} />
                            </div>

                            <div className="col-4">
                                <div className="info-section">
                                    <div className="header-line" />
                                    <div className="view-col">
                                        {/* <span>{project?.totalNumberOfBackers}</span> */}
                                        <span>210</span>
                                        <span>backers</span>
                                    </div>
                                    <div className="view-col">
                                        <span>{project?.duration}</span>
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
                                        <span className="font-medium">{`${Math.floor((project?.fundedAmount / project?.goal) * 100)}% of $${project?.goal?.toLocaleString()}`}</span>
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
                                <button className="tf-button w-full" onClick={e => setIsModalOpen(true)}>
                                    PICK YOUR PERK
                                </button>
                            </div>
                        </div>

                        <HtmlRenderer htmlContent={project?.description} />

                        {isModalOpen ?
                            <RewardModal
                                closeModal={closeModal}
                                project={project}
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
                                <Rewards project={project} />
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

function RewardModal({ closeModal, project }) {
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
                            required
                        />
                        <span className="currency-suffix">USD</span>
                        <button className="tf-button">CONTINUE</button>
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

                                    <button className="tf-button w-full mt-5">
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