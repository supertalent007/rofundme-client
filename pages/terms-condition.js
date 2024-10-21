import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
export default function Home() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>

            <Layout headerStyle={1} footerStyle={1}>

                <div>
                    <div className="flat-title-page">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="heading text-center">Terms &amp; Condition</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-section-2 widget-term-condition">
                        <div className="themesflat-container">
                            <div className="row flat-tabs">
                                <div className="col-md-3 col-12">
                                    <div className="wrap-menu po-sticky">
                                        <ul className="menu-tab">
                                            <li className={activeIndex === 1 ? "item-title active" : "item-title"} onClick={() => handleOnClick(1)}>
                                                <span className="inner">1. Introduction</span>
                                            </li>
                                            <li className={activeIndex === 2 ? "item-title active" : "item-title"} onClick={() => handleOnClick(2)}>
                                                <span className="inner">2. Acceptance of Terms</span>
                                            </li>
                                            <li className={activeIndex === 3 ? "item-title active" : "item-title"} onClick={() => handleOnClick(3)}>
                                                <span className="inner">3. Account Registration</span>
                                            </li>
                                            <li className={activeIndex === 4 ? "item-title active" : "item-title"} onClick={() => handleOnClick(4)}>
                                                <span className="inner">4. User Eligibility</span>
                                            </li>
                                            <li className={activeIndex === 5 ? "item-title active" : "item-title"} onClick={() => handleOnClick(5)}>
                                                <span className="inner">5. Monthly Fee</span>
                                            </li>
                                            <li className={activeIndex === 6 ? "item-title active" : "item-title"} onClick={() => handleOnClick(6)}>
                                                <span className="inner">6. Campaign Creation</span>
                                            </li>
                                            <li className={activeIndex === 7 ? "item-title active" : "item-title"} onClick={() => handleOnClick(7)}>
                                                <span className="inner">7. Use of Funds</span>
                                            </li>
                                            <li className={activeIndex === 8 ? "item-title active" : "item-title"} onClick={() => handleOnClick(8)}>
                                                <span className="inner">8. Backer Contributions</span>
                                            </li>
                                            <li className={activeIndex === 9 ? "item-title active" : "item-title"} onClick={() => handleOnClick(9)}>
                                                <span className="inner">9. Intellectual Property</span>
                                            </li>
                                            <li className={activeIndex === 10 ? "item-title active" : "item-title"} onClick={() => handleOnClick(10)}>
                                                <span className="inner">10. Prohibited Activities</span>
                                            </li>
                                            <li className={activeIndex === 11 ? "item-title active" : "item-title"} onClick={() => handleOnClick(11)}>
                                                <span className="inner">11. Termination</span>
                                            </li>
                                            <li className={activeIndex === 12 ? "item-title active" : "item-title"} onClick={() => handleOnClick(12)}>
                                                <span className="inner">12. Liability Disclaimer</span>
                                            </li>
                                            <li className={activeIndex === 13 ? "item-title active" : "item-title"} onClick={() => handleOnClick(13)}>
                                                <span className="inner">13. Privacy Policy</span>
                                            </li>
                                            <li className={activeIndex === 14 ? "item-title active" : "item-title"} onClick={() => handleOnClick(14)}>
                                                <span className="inner">14. Governing Law</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-9 col-12">
                                    <div className="content-tab po-sticky-footer">
                                        <div className="content-inner" style={{ display: `${activeIndex === 1 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>Welcome to RoFundMe, a crowdfunding platform dedicated to supporting Roblox game developers.</p>
                                            <p>By using our platform, you agree to the terms outlined in this document, which govern your access to and use of RoFundMe. </p>
                                            <p>Our mission is to help creators bring their game ideas to life, and we are committed to providing a secure and supportive environment for both developers and backers.</p>
                                            <p>Please read these Terms of Service carefully before using the platform. Your continued use of RoFundMe signifies your agreement to abide by these terms.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 2 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>By accessing and using RoFundMe, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not use the platform. RoFundMe reserves the right to modify these terms at any time, and your continued use of the platform indicates your acceptance of the revised terms.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 3 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>To create and manage campaigns on RoFundMe, users must register for an account. By creating an account, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 4 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>You must be at least 13 years old to use RoFundMe. If you are under the age of 18, you must have the consent of a parent or legal guardian. By using the platform, you represent that you meet these requirements.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 5 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>Users are required to pay a $10 monthly fee to post and maintain projects on RoFundMe. This fee is non-refundable and will be charged to the payment method provided during registration.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 6 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>When creating a campaign on RoFundMe, you agree to provide accurate and honest information about your project, goals, and funding needs. RoFundMe reserves the right to review, approve, or reject campaigns at its discretion.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 7 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>Funds raised through RoFundMe must be used solely for the purpose stated in your campaign. Misuse of funds or false representation of your campaign may result in suspension or termination of your account.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 8 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>Backers contribute to campaigns at their own risk. RoFundMe does not guarantee the success or delivery of any project, nor does it assume responsibility for the actions or omissions of campaign creators.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 9 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>You retain ownership of the content you post on RoFundMe. However, by posting content, you grant RoFundMe a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content for the purpose of promoting your campaign and the platform.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 10 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>Users may not engage in illegal activities or violate the rights of others while using RoFundMe. Prohibited actions include but are not limited to:</p>
                                            <ul style={{ marginLeft: '20px' }}>
                                                <p>Posting misleading or false information</p>
                                                <p>Posting misleading or false information</p>
                                                <p>Posting misleading or false information</p>
                                                <p>Posting misleading or false information</p>
                                            </ul>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 11 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>RoFundMe reserves the right to suspend or terminate any user account at its discretion, including but not limited to instances of violation of these Terms of Service, misuse of the platform, or fraudulent activity.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 12 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>RoFundMe is a platform for crowdfunding, and as such, it does not guarantee the success of any campaign. RoFundMe is not responsible for any loss or damage arising from the use of the platform, including but not limited to failed campaigns, misuse of funds, or issues between users.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 13 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>Your use of RoFundMe is subject to our Privacy Policy, which outlines how we collect, use, and protect your personal information. By using the platform, you agree to our collection and use of your information as described in the Privacy Policy.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 14 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>These Terms of Service are governed by the laws of the State of Florida. Any disputes arising out of these terms will be subject to the exclusive jurisdiction of the courts in Florida.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}