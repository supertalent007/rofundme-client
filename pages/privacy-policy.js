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
                                    <h1 className="heading text-center">Privacy Policy</h1>
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
                                                <span className="inner">2. Information We Collect</span>
                                            </li>
                                            <li className={activeIndex === 3 ? "item-title active" : "item-title"} onClick={() => handleOnClick(3)}>
                                                <span className="inner">3. How We Use Your Information</span>
                                            </li>
                                            <li className={activeIndex === 4 ? "item-title active" : "item-title"} onClick={() => handleOnClick(4)}>
                                                <span className="inner">4. Sharing Your Information</span>
                                            </li>
                                            <li className={activeIndex === 5 ? "item-title active" : "item-title"} onClick={() => handleOnClick(5)}>
                                                <span className="inner">5. Security of Your Information</span>
                                            </li>
                                            <li className={activeIndex === 6 ? "item-title active" : "item-title"} onClick={() => handleOnClick(6)}>
                                                <span className="inner">6. Your Rights</span>
                                            </li>
                                            <li className={activeIndex === 7 ? "item-title active" : "item-title"} onClick={() => handleOnClick(7)}>
                                                <span className="inner">7. Third-Party Links</span>
                                            </li>
                                            <li className={activeIndex === 8 ? "item-title active" : "item-title"} onClick={() => handleOnClick(8)}>
                                                <span className="inner">8. Changes to This Privacy Policy</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-9 col-12">
                                    <div className="content-tab po-sticky-footer">
                                        <div className="content-inner" style={{ display: `${activeIndex === 1 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>At RoFundMe, we are committed to protecting your privacy.</p>
                                            <p>This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our platform. By using RoFundMe, you consent to the practices described in this policy.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 2 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>We may collect the following types of information:</p>
                                            <ul>
                                                <li>Personal Information: When you create an account, we may collect personal information such as your name, email address, and payment information.</li>
                                                <li>Project Information: Details related to the projects you post, including descriptions, funding goals, and rewards offered to backers.</li>
                                                <li>Usage Data: Information about how you use our platform, including your IP address, browser type, access times, and pages viewed.</li>
                                            </ul>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 3 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>We may use the information we collect for various purposes, including to:</p>
                                            <ul>
                                                <li>Create and manage your account.</li>
                                                <li>Process transactions and send you related information.</li>
                                                <li>Communicate with you about your account and projects.</li>
                                                <li>Improve our services and develop new features.</li>
                                                <li>Monitor and analyze usage and trends to enhance user experience.</li>
                                            </ul>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 4 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>We do not sell or rent your personal information to third parties. We may share your information in the following situations:</p>
                                            <ul>
                                                <li>With Service Providers: We may share your information with third-party vendors to facilitate payments and provide other services.</li>
                                                <li>For Legal Reasons: We may disclose your information if required by law or in response to legal requests.</li>
                                            </ul>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 5 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>We take reasonable measures to protect your information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 6 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>You may have certain rights regarding your personal information, including the right to access, correct, or delete your information. To exercise these rights, please contact us at <a>rofundme@support.com</a>.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 7 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these websites and encourage you to review their privacy policies.</p>
                                        </div>
                                        <div className="content-inner" style={{ display: `${activeIndex === 8 ? "block" : "none"}` }}>
                                            <div className="date">Last Updated: Oct 19, 2024</div>
                                            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of RoFundMe after any changes constitutes your acceptance of the new Privacy Policy.</p>
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