import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
export default function Home() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

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

            <Layout headerStyle={1} footerStyle={1} pageCls="faqs-page">

                <div>
                    <div className="page-title faqs">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-12">
                                    <h1 data-wow-delay="0s" className="wow fadeInUp heading text-center">Frequently asked questions</h1>
                                    <p data-wow-delay="0.1s" className="wow fadeInUp ">Quick answers to questions you may have.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tf-section-2 wrap-accordion">
                        <div className="themesflat-container w730">
                            <div className="row">
                                <div className="col-md-12 mb-20">
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
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 6 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(6)}>6. What happens if I don’t reach my funding goal?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 6 ? "block" : "none"}` }}>
                                                <p>If your campaign does not reach its goal, you won’t be charged any fees, and backers will not be billed. You can always adjust your project and try again!</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 7 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(7)}>7. Can backers get rewards?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 7 ? "block" : "none"}` }}>
                                                <p>Yes! You can set up reward tiers for your backers, offering exclusive in-game items, early access, or other perks to incentivize support.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 8 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(8)}>8. Is RoFundMe safe?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 8 ? "block" : "none"}` }}>
                                                <p>Absolutely! We prioritize the security of your personal and financial information with industry-standard security measures and secure payment gateways.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 9 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(9)}>9. How can I promote my campaign?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 9 ? "block" : "none"}` }}>
                                                <p>We offer built-in sharing tools that allow you to easily promote your campaign on social media and within the Roblox community, helping you reach more backers.</p>
                                            </div>
                                        </div>
                                        <div data-wow-delay="0s" className="wow fadeInUp flat-toggle">
                                            <h6 className={isActive.key == 10 ? "toggle-title active" : "toggle-title"} onClick={() => handleToggle(10)}>10. How much does RoFundMe charge?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive.key == 10 ? "block" : "none"}` }}>
                                                <p>RoFundMe requires users to pay $10 every month to post their projects on the platform. This fee helps us maintain the platform and provide continuous support to creators. There are no additional charges taken from successfully funded campaigns, allowing you to keep 100% of your raised funds.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 ">
                                    <div className="flat-button flex justify-center">
                                        <Link href="/contact-us" className="tf-button style-1 h50">Get in touch</Link>
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