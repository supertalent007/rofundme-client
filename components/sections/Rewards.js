import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

export default function Rewards({ project, isMobile, user }) {
    return (
        <div className="tf-section action">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        {project?.rewards?.length &&
                            project.rewards.map((reward, index) => (
                                <RewardCard reward={reward} project={project} key={`reward-${index}`} isMobile={isMobile} user={user} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RewardCard({ reward, project, isMobile, user }) {
    const MEDIA_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;
    const stripe = useStripe();
    const elements = useElements();
    const [backerCnt, setBackerCnt] = useState(0);

    useEffect(() => {
        axios.get(`${BACKEND_API}/projects/get_number_of_backers_for_reward/${reward?._id}`)
            .then(res => {
                setBackerCnt(res.data.numberOfBackers);
            })
    }, []);

    const formatEstimatedDeliveryDate = (createdAt, durationInDays) => {
        const createdDate = new Date(createdAt);
        createdDate.setDate(createdDate.getDate() + durationInDays);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[createdDate.getMonth()]} ${createdDate.getFullYear()}`;
    };

    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }

        if (!user?.isVerified) {
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

    return (
        <div className="flex row">
            <div className={isMobile ? 'col-12' : 'col-5'}>
                <div className="flex-col gap30 mt-4 mb-4 reward-card">
                    <img src={`${MEDIA_URL}/${reward?.filePath}`} alt="media" style={{ width: '100%' }} />
                    <div className="p20">
                        <div className="flex justify-between">
                            <h3>{reward?.title}</h3>
                            <h5>${reward?.amount}</h5>
                        </div>
                        <div className="flex justify-between mt-5">
                            <div className="flex flex-col align-center">
                                <span className="mb-2">Backers:</span>
                                <span>{backerCnt}</span>
                            </div>
                            <div className="flex flex-col align-center">
                                <span className="mb-2">Estimated Delivery:</span>
                                <span>{formatEstimatedDeliveryDate(project.createdAt, project.duration)}</span>
                            </div>
                        </div>

                        <button className="mt-5 tf-button force-w-full" onClick={handleSubmit}>
                            GET THIS PERK
                        </button>
                    </div>
                </div>
            </div>
            <div className={"mt-4 mb-4 flex-col flex p20 " + isMobile ? "col-12" : "col-7"}>
                <div className="flex align-center" style={{ fontSize: '15px', lineHeight: '20px' }}>
                    {reward?.description}
                </div>
            </div>
        </div>
    );
}
