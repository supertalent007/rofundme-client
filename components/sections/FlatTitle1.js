

import Link from "next/link"
import TitileSlider1 from "../slider/TitileSlider1"
export default function FlatTitle1() {
    return (
        <>
            <div className="flat-pages-title">
                <div className="widget-bg-line">
                    <div className="wraper">
                        <div className="bg-grid-line y top">
                            <div className="bg-line"></div>
                        </div>
                        <div className="bg-grid-line x left">
                            <div className="bg-line"></div>
                        </div>
                        <div className="bg-grid-line x right">
                            <div className="bg-line"></div>
                        </div>
                        <div className="bg-grid-line y bottom">
                            <div className="bg-line" />
                        </div>
                    </div>
                </div>
                <div className="themesflat-container w1490">
                    <div className="row">
                        <div className="col-12 pages-title">
                            <div className="content">
                                <h1 data-wow-delay="0s" className="wow fadeInUp">Your creative ideas into reality</h1>
                                <p className="wow fadeInUp" data-wow-delay="0.1s">Welcome to RoFundMe, the ultimate crowdfunding platform for Roblox games! Discover and support talented game developers as they bring their unique Roblox creations to life. Join our community and help fund the next big hit!</p>
                                <div data-wow-delay="0.2s" className=" wow fadeInUp flat-button flex justify-center">
                                    <Link href="/project-create" className="tf-button style-1 h50 w190 mr-16">Get Started <i className="icon-arrow-up-right2" /></Link>
                                    <Link href="#" className="tf-button style-1 h50 w190 active">All collections <i className="icon-arrow-up-right2" /></Link>
                                </div>
                            </div>
                            <div className="icon-background">
                                <img className="absolute item1" src="/assets/images/item-background/item1.png" alt="" />
                                <img className="absolute item2" src="/assets/images/item-background/item2.png" alt="" />
                                <img className="absolute item3" src="/assets/images/item-background/item3.png" alt="" />
                                <img className="absolute item4" src="/assets/images/item-background/item1.png" alt="" />
                                <img className="absolute item5" src="/assets/images/item-background/item1.png" alt="" />
                                <img className="absolute item6" src="/assets/images/item-background/item4.png" alt="" />
                                <img className="absolute item7" src="/assets/images/item-background/item5.png" alt="" />
                                <img className="absolute item8" src="/assets/images/item-background/item5.png" alt="" />
                            </div>
                            <div className="relative">
                                <TitileSlider1 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
