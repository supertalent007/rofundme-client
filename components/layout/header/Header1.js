import Link from "next/link"
import { useState, useEffect } from 'react'
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"
import { jwtDecode } from 'jwt-decode';
import axios from "axios"

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function Header1({ scroll, isMobileMenu, handleMobileMenu }) {
    const [isSidebar, setSidebar] = useState(false)
    const handleSidebar = () => setSidebar(!isSidebar)
    const [isToggled, setToggled] = useState(false)
    const [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const userId = jwtDecode(localStorage.getItem('token')).id;
            axios
                .get(`${BACKEND_API}/users/single/${userId}`)
                .then(res => {
                    setUser(res.data)
                })
        }
    }, []);

    const handleToggle = () => setToggled(!isToggled)

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <>
            <header id="header_main" className={`header_1 header-fixed ${scroll ? "is-fixed is-small" : ""}`}>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="site-header-inner">
                                <div className="wrap-box flex">
                                    <div id="site-logo">
                                        <div id="site-logo-inner">
                                            <Link href="/" rel="home" className="main-logo">
                                                <img id="logo_header" src="/assets/images/logo/new_logo.png" data-retina="assets/images/logo/logo@2x.png" />
                                            </Link>
                                        </div>
                                    </div>{/* logo */}
                                    <div className="mobile-button" onClick={handleMobileMenu}>
                                        <span />
                                    </div>{/* /.mobile-button */}
                                    <nav id="main-nav" className="main-nav">
                                        <Menu />
                                    </nav>{/* /#main-nav */}
                                    {/* <div className="flat-wallet flex">
                                        <div id="wallet-header">
                                            <Link href="/market-wallet" id="connectbtn" className="tf-button style-1">
                                                <span>Wallet connect</span>
                                                <i className="icon-wa" />
                                            </Link>
                                        </div>
                                        <div className="canvas" onClick={handleSidebar}>
                                            <span />
                                        </div>
                                    </div> */}
                                    {
                                        localStorage.getItem('token') ?
                                            <div className="admin_active flex gap4 flat-wallet" id="header_admin">
                                                <div className="popup-user relative">
                                                    <div className="user" onClick={handleToggle}>
                                                        <img src={user?.avatar} alt="" />
                                                        <span>{user?.name}<i className="icon-keyboard_arrow_down" /></span>
                                                    </div>
                                                    <div className={`avatar_popup2 ${isToggled ? "visible" : ""}`}>
                                                        <div >
                                                            <div className="links">
                                                                <Link className="block mb-30" href="#">
                                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M0.774902 18.333C0.774902 18.7932 1.14762 19.1664 1.60824 19.1664C2.06885 19.1664 2.44157 18.7932 2.44157 18.333C2.44157 15.3923 4.13448 12.7889 6.77329 11.5578C7.68653 12.1513 8.77296 12.4997 9.94076 12.4997C11.113 12.4997 12.2036 12.1489 13.119 11.5513C13.9067 11.9232 14.6368 12.4235 15.2443 13.0307C16.6611 14.4479 17.4416 16.3311 17.4416 18.333C17.4416 18.7932 17.8143 19.1664 18.2749 19.1664C18.7355 19.1664 19.1083 18.7932 19.1083 18.333C19.1083 15.8859 18.1545 13.5845 16.4227 11.8523C15.8432 11.2725 15.1698 10.7754 14.4472 10.3655C15.2757 9.3581 15.7741 8.06944 15.7741 6.66635C15.7741 3.44979 13.1569 0.833008 9.94076 0.833008C6.72461 0.833008 4.10742 3.44979 4.10742 6.66635C4.10742 8.06604 4.60379 9.35154 5.42863 10.3579C2.56796 11.9685 0.774902 14.9779 0.774902 18.333V18.333ZM9.94076 2.49968C12.2381 2.49968 14.1074 4.36898 14.1074 6.66635C14.1074 8.96371 12.2381 10.833 9.94076 10.833C7.6434 10.833 5.77409 8.96371 5.77409 6.66635C5.77409 4.36898 7.6434 2.49968 9.94076 2.49968V2.49968Z" fill="white" />
                                                                    </svg>
                                                                    <span>My Profile</span>
                                                                </Link>
                                                                <Link className="block" href="/" id="logout" onClick={handleLogout}>
                                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.9668 18.3057H2.49168C2.0332 18.3057 1.66113 17.9335 1.66113 17.4751V2.52492C1.66113 2.06644 2.03324 1.69437 2.49168 1.69437H9.9668C10.4261 1.69437 10.7973 1.32312 10.7973 0.863828C10.7973 0.404531 10.4261 0.0332031 9.9668 0.0332031H2.49168C1.11793 0.0332031 0 1.15117 0 2.52492V17.4751C0 18.8488 1.11793 19.9668 2.49168 19.9668H9.9668C10.4261 19.9668 10.7973 19.5955 10.7973 19.1362C10.7973 18.6769 10.4261 18.3057 9.9668 18.3057Z" fill="white" />
                                                                        <path d="M19.7525 9.40904L14.7027 4.42564C14.3771 4.10337 13.8505 4.10755 13.5282 4.43396C13.206 4.76036 13.2093 5.28611 13.5366 5.60837L17.1454 9.16982H7.47508C7.01578 9.16982 6.64453 9.54107 6.64453 10.0004C6.64453 10.4597 7.01578 10.8309 7.47508 10.8309H17.1454L13.5366 14.3924C13.2093 14.7147 13.2068 15.2404 13.5282 15.5668C13.691 15.7313 13.9053 15.8143 14.1196 15.8143C14.3306 15.8143 14.5415 15.7346 14.7027 15.5751L19.7525 10.5917C19.9103 10.4356 20 10.2229 20 10.0003C20 9.77783 19.9111 9.56603 19.7525 9.40904Z" fill="white" />
                                                                    </svg>
                                                                    <span>Log out</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                            <div className="flex gap4 flat-wallet">
                                                <Link href="sign-up" className="tf-button w50 active">Sign Up</Link>
                                                <Link href="login" className="tf-button w50">Sign In</Link>
                                            </div>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`canvas-nav-wrap ${isSidebar ? "active" : ""}`}>
                    <div className="overlay-canvas-nav" onClick={handleSidebar} />
                    <div className="inner-canvas-nav">
                        <div className="side-bar">
                            <Link href="/" rel="home" className="main-logo">
                                <img id="logo_header" src="/assets/images/logo/logo.png" data-retina="assets/images/logo/logo@2x.png" />
                            </Link>
                            <div className="canvas-nav-close" onClick={handleSidebar}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xmlSpace="preserve"><g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" /></g></svg>
                            </div>
                            <div className="widget-search mt-30">
                                <form action="#" method="get" role="search" className="search-form relative">
                                    <input type="search" id="search" className="search-field style-1" placeholder="Search..." name="s" title="Search for" required />
                                    <button className="search search-submit" type="submit" title="Search">
                                        <i className="icon-search" />
                                    </button>
                                </form>
                            </div>
                            <div className="widget widget-categories">
                                <h5 className="title-widget">Categories</h5>
                                <ul>
                                    <li>
                                        <div className="cate-item"><Link href="#">NFTs</Link></div>
                                        <div className="number">(1.483)</div>
                                    </li>
                                    <li>
                                        <div className="cate-item"><Link href="#">Digital Art</Link></div>
                                        <div className="number">(97)</div>
                                    </li>
                                    <li>
                                        <div className="cate-item"><Link href="#">Crypto</Link></div>
                                        <div className="number">(45)</div>
                                    </li>
                                    <li>
                                        <div className="cate-item"><Link href="#">Technology</Link></div>
                                        <div className="number">(728)</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="widget widget-menu style-4">
                                <h5 className="title-widget">Company</h5>
                                <ul>
                                    <li><Link href="#">Help center</Link></li>
                                    <li><Link href="#">Platform status</Link></li>
                                </ul>
                            </div>
                            <div className="widget">
                                <h5 className="title-widget">Join the community</h5>
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
                <div className={`mobile-nav-wrap ${isMobileMenu ? "active" : ""}`}>
                    <div className="overlay-mobile-nav" onClick={handleMobileMenu} />
                    <div className="inner-mobile-nav">
                        <Link href="/" rel="home" className="main-logo">
                            <img id="mobile-logo_header" src="/assets/images/logo/logo.png" data-retina="assets/images/logo/logo@2x.png" />
                        </Link>
                        <div className="mobile-nav-close" onClick={handleMobileMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 122.878 122.88" enableBackground="new 0 0 122.878 122.88" xmlSpace="preserve"><g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" /></g></svg>
                        </div>
                        <MobileMenu />
                    </div>
                </div>
            </header>

        </>
    )
}
