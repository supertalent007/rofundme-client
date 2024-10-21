import Link from "next/link"

export default function Footer1() {
    return (
        <>
            <footer id="footer">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-content flex flex-grow">
                                <div className="widget-logo flex-grow">
                                    <div className="logo-footer" id="logo-footer">
                                        <Link href="/">
                                            <img id="logo_footer" src="/assets/images/logo/new_logo.png" data-retina="assets/images/logo/logo@2x.png" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="widget widget-menu style-1">
                                    <h5 className="title-widget">Project</h5>
                                    <ul>
                                        <li><Link href="/projects">All Projects</Link></li>
                                        <li><Link href="/project-create">Start A Campaign</Link></li>
                                    </ul>
                                </div>
                                <div className="widget widget-menu style-3">
                                    <h5 className="title-widget">Learn</h5>
                                    <ul>
                                        <li><Link href="/faq">How It Works</Link></li>
                                        <li><Link href="/faq">Education Center</Link></li>
                                        <li><Link href="/faq">What is Crowdfunding</Link></li>
                                        <li><Link href="/faq">Trust & Safety</Link></li>
                                    </ul>
                                </div>
                                <div className="widget-last">
                                    <div className="widget-menu style-4">
                                        <h5 className="title-widget">Company</h5>
                                        <ul>
                                            <li><Link href="/about-us">About Us</Link></li>
                                            <li><Link href="/contact-us">Contact Us</Link></li>
                                        </ul>
                                    </div>
                                    <h5 className="title-widget mt-30">Join the community</h5>
                                    <div className="widget-social">
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
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© {new Date().getFullYear()} RoFundMe - Made By Terry</p>
                        <ul className="flex">
                            <li>
                                <Link href="/privacy-policy">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms-condition">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>

        </>
    )
}
