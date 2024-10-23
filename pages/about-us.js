import BidModal from "@/components/elements/BidModal"
import Layout from "@/components/layout/Layout"
import axios from "axios"
import dynamic from 'next/dynamic'
import Link from "next/link"

const CounterUp = dynamic(() => import('@/components/elements/CounterUp'), {
    ssr: false,
})

import { useEffect, useState } from "react"

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {

    const [isBidModal, setBidModal] = useState(false)
    const handleBidModal = () => setBidModal(!isBidModal)
    const [totalNumberOfProjects, setTotalNumberOfProjects] = useState(0);
    const [totalNumberOfUsers, setTotalNumberOfUsers] = useState(0);
    const [totalNumberOfTransactions, setTotalNumberOfTransactions] = useState(0);

    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    useEffect(() => {
        axios.get(`${BACKEND_API}//users/total`)
            .then(res => {
                setTotalNumberOfUsers(res.data);
            })

        axios.get(`${BACKEND_API}//projects/total`)
            .then(res => {
                setTotalNumberOfProjects(res.data);
            })

        axios.get(`${BACKEND_API}//transactions/total`)
            .then(res => {
                setTotalNumberOfTransactions(res.data);
            })
    }, []);

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    return (
        <>

            <Layout headerStyle={1} footerStyle={1} pageCls="about-us-page">

                <div>
                    <div className="page-title about-us relative">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-12 pages-title">
                                    <h1 data-wow-delay="0s" className="wow fadeInUp">Fuel Your Roblox Game Dream: Crowdfund, Create, Conquer!</h1>
                                    <div className="icon-background mt-5">
                                        <img className="absolute item1" src="/assets/images/item-background/item11.png" alt="" />
                                        <img className="absolute item2" src="/assets/images/item-background/item10.png" alt="" />
                                        <img className="absolute item3" src="/assets/images/item-background/item12.png" alt="" />
                                        <img className="absolute item4" src="/assets/images/item-background/item13.png" alt="" />
                                    </div>
                                    <p>
                                        Welcome to RoFundMe!
                                        RoFundMe is the ultimate crowdfunding platform designed exclusively for Roblox game creators. Whether you're an aspiring developer with a game idea or a seasoned builder looking to take your creation to the next level, RoFundMe helps bring your vision to life by connecting you with a community of passionate supporters. Raise funds, grow your game, and join a thriving ecosystem where innovation meets opportunity in the world of Roblox. Let’s build something amazing together!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-section-2 counter">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="counter__body-1">
                                        <div className="counter-1">
                                            <div className="number-counter">
                                                <span className="number" data-speed={3000} data-to={99} data-inviewport="yes"><CounterUp count={totalNumberOfProjects} time={1} /></span>
                                            </div>
                                            <h6 className="title">Projects</h6>
                                        </div>
                                        <div className="space">
                                            <svg width={80} height={19} viewBox="0 0 80 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.2" x="0.75" y="9.25" width="29.5" height="0.5" stroke="white" strokeWidth="0.5" strokeDasharray="4 2" />
                                                <circle opacity="0.2" cx={40} cy="9.5" r={9} stroke="white" />
                                                <circle opacity="0.2" cx={40} cy="9.5" r="4.5" fill="white" />
                                                <rect opacity="0.2" x="49.75" y="9.25" width="29.5" height="0.5" stroke="white" strokeWidth="0.5" strokeDasharray="4 2" />
                                            </svg>
                                        </div>
                                        <div className="counter-1">
                                            <div className="number-counter">
                                                <span className="number" data-speed={3000} data-to={72} data-inviewport="yes"><CounterUp count={totalNumberOfUsers} time={1} /></span>
                                            </div>
                                            <h6 className="title">Users</h6>
                                        </div>
                                        <div className="space">
                                            <svg width={80} height={19} viewBox="0 0 80 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.2" x="0.75" y="9.25" width="29.5" height="0.5" stroke="white" strokeWidth="0.5" strokeDasharray="4 2" />
                                                <circle opacity="0.2" cx={40} cy="9.5" r={9} stroke="white" />
                                                <circle opacity="0.2" cx={40} cy="9.5" r="4.5" fill="white" />
                                                <rect opacity="0.2" x="49.75" y="9.25" width="29.5" height="0.5" stroke="white" strokeWidth="0.5" strokeDasharray="4 2" />
                                            </svg>
                                        </div>
                                        <div className="counter-1">
                                            <div className="number-counter">
                                                <span className="number" data-speed={3000} data-to={128} data-inviewport="yes"><CounterUp count={totalNumberOfTransactions} time={1} /></span>
                                            </div>
                                            <h6 className="title">Transactions</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-section-2 widget-box-icon">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="heading-section-1">
                                        <h2 className="tf-title pb-40">Why choose us</h2>
                                    </div>
                                </div>
                                <div data-wow-delay="0s" className="wow fadeInUp col-md-4">
                                    <div className="box-icon-item">
                                        <img className="custom-image-height" src="/assets/images/item-background/about-01.webp" alt="" />
                                        <div className="title"><Link href="#">Roblox-Focused Community</Link></div>
                                        <p>RoFundMe is tailored exclusively for Roblox game developers, ensuring that your project is seen and supported by a community that truly understands and appreciates Roblox creations.</p>
                                    </div>
                                </div>
                                <div data-wow-delay="0.1s" className="wow fadeInUp col-md-4">
                                    <div className="box-icon-item">
                                        <img className="custom-image-height" src="/assets/images/item-background/about-02.webp" alt="" />
                                        <div className="title"><Link href="#">Seamless Fundraising</Link></div>
                                        <p>We make it easy for you to raise funds with user-friendly tools and secure payment options, so you can focus on what matters most—building your game and engaging with your supporters.</p>
                                    </div>
                                </div>
                                <div data-wow-delay="0.2s" className="wow fadeInUp col-md-4">
                                    <div className="box-icon-item">
                                        <img className="custom-image-height" src="/assets/images/item-background/about-03.webp" alt="" />
                                        <div className="title"><Link href="#">Boost Your Game’s Visibility</Link></div>
                                        <p>By hosting your project on RoFundMe, you get access to a platform designed to showcase Roblox games, helping you gain visibility and reach more potential backers passionate about your idea.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="widget-our-team">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="heading-section-1">
                                        <h2 className="tf-title pb-40">Meet Our Amazing Team</h2>
                                    </div>
                                </div>
                                <div data-wow-delay="0s" className="wow fadeInUp col-md-3 col-6">
                                    <div className="our-team-item pb-38 text-center">
                                        <img src="/assets/images/avatar/team-01.png" alt="" />
                                        <div className="name"><Link href="#">Wiz</Link></div>
                                        <div className="info">CEO, Director</div>
                                        <div className="widget-social">
                                            <ul className="flex justify-center">
                                                <li><Link href="#" className="icon-facebook" /></li>
                                                <li><Link href="#" className="icon-twitter" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div data-wow-delay="0.1s" className="wow fadeInUp col-md-3 col-6">
                                    <div className="our-team-item pb-38 text-center">
                                        <img src="/assets/images/avatar/team-02.png" alt="" />
                                        <div className="name"><Link href="#">Meta</Link></div>
                                        <div className="info">Funder</div>
                                        <div className="widget-social">
                                            <ul className="flex justify-center">
                                                <li><Link href="#" className="icon-facebook" /></li>
                                                <li><Link href="#" className="icon-twitter" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div data-wow-delay="0.1s" className="wow fadeInUp col-md-3 col-6">
                                    <div className="our-team-item pb-38 text-center">
                                        <img src="/assets/images/avatar/team-02.png" alt="" />
                                        <div className="name"><Link href="#">Terry</Link></div>
                                        <div className="info">CTO</div>
                                        <div className="widget-social">
                                            <ul className="flex justify-center">
                                                <li><Link href="#" className="icon-facebook" /></li>
                                                <li><Link href="#" className="icon-twitter" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div data-wow-delay="0.2s" className="wow fadeInUp col-md-3 col-6">
                                    <div className="our-team-item pb-38 text-center">
                                        <img src="/assets/images/avatar/team-03.png" alt="" />
                                        <div className="name"><Link href="#">John</Link></div>
                                        <div className="info">UI/UX Designer</div>
                                        <div className="widget-social">
                                            <ul className="flex justify-center">
                                                <li><Link href="#" className="icon-facebook" /></li>
                                                <li><Link href="#" className="icon-twitter" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Link href="#" className="tf-button style-1 h50 w190 m-auto">Join us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-section-2 wrap-accordion pt-80">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="heading-section-1">
                                        <h2 className="tf-title pb-40">Frequently Asked Questions</h2>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="flat-accordion">
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 1 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(1)}>1. What is RoFundMe?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}>
                                                <p>RoFundMe is a crowdfunding platform specifically designed for Roblox game creators. It allows developers to raise funds from the community to bring their Roblox game ideas to life.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 2 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(2)}>2. Who can use RoFundMe?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}>
                                                <p>Anyone with a Roblox game idea or an existing project in development can use RoFundMe. Whether you're an indie developer or a studio, RoFundMe provides the tools to support your game's funding journey.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 3 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(3)}>3. How do I create a campaign?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 3 ? "block" : "none"}` }}>
                                                <p>Simply sign up, create a profile, and follow our step-by-step process to set up your campaign. You'll need to provide details about your game, funding goals, and any rewards for your backers.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 4 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(4)}>4. What payment methods are available?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}>
                                                <p>We support various payment options, including major credit cards, ensuring backers can contribute easily and securely.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 5 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(5)}>5. How do I receive the funds?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 5 ? "block" : "none"}` }}>
                                                <p>Once your campaign successfully reaches its funding goal, the funds will be transferred to your account. We ensure a safe and straightforward process for withdrawing your funds.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="flat-accordion2">
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                            <h6 className={isActive.key == 6 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(6)}>6. What happens if I don’t reach my funding goal?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 6 ? "block" : "none"}` }}>
                                                <p>If your campaign does not reach its goal, you won’t be charged any fees, and backers will not be billed. You can always adjust your project and try again!</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                            <h6 className={isActive.key == 7 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(7)}>7. Can backers get rewards?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 7 ? "block" : "none"}` }}>
                                                <p>Yes! You can set up reward tiers for your backers, offering exclusive in-game items, early access, or other perks to incentivize support.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                            <h6 className={isActive.key == 8 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(8)}>8. Is RoFundMe safe?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 8 ? "block" : "none"}` }}>
                                                <p>Absolutely! We prioritize the security of your personal and financial information with industry-standard security measures and secure payment gateways.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                            <h6 className={isActive.key == 9 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(9)}>9. How can I promote my campaign?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 9 ? "block" : "none"}` }}>
                                                <p>We offer built-in sharing tools that allow you to easily promote your campaign on social media and within the Roblox community, helping you reach more backers.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle2">
                                            <h6 className={isActive.key == 10 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(10)}>10. How much does RoFundMe charge?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 10 ? "block" : "none"}` }}>
                                                <p>RoFundMe requires users to pay $10 every month to post their projects on the platform. This fee helps us maintain the platform and provide continuous support to creators. There are no additional charges taken from successfully funded campaigns, allowing you to keep 100% of your raised funds.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="content">
                                        <div className="text">Still have question?</div>
                                        <p>Can't find what you're looking for? Please <Link href="#" className="tf-color">chat to our friendly team</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BidModal handleBidModal={handleBidModal} isBidModal={isBidModal} />
            </Layout>
        </>
    )
}