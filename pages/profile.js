import ActiveBid from "@/components/sections/ActiveBid"
import Collection from "@/components/sections/Collection"
import Create from "@/components/sections/Create"
import Explore from "@/components/sections/Explore"
import Favourite from "@/components/sections/Favourite"
import History from "@/components/sections/History"
import AllProjects from "@/components/sections/AllProjects"
import Settings from "@/components/sections/Settings"
import Wallet from "@/components/sections/Wallet"
import Profile from '@/components/sections/Profile';
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from 'jwt-decode';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {

    const [activeIndex, setActiveIndex] = useState(4)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    const [isToggled, setToggled] = useState(false)
    const handleToggle = () => setToggled(!isToggled)

    const [isToggled2, setToggled2] = useState(false)
    const handleToggle2 = () => setToggled2(!isToggled2)

    const [isMobileSidebar, setMobileSidebar] = useState(false)
    const handleMobileSidebar = () => setMobileSidebar(!isMobileSidebar)
    const [user, setUser] = useState({});

    useEffect(() => {
        const userId = jwtDecode(localStorage.getItem('token')).id;
        axios
            .get(`${BACKEND_API}/users/single/${userId}`)
            .then(res => {
                setUser(res.data)
            })
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <>

            <div id="wrapper">
                <div id="page" className={`market-page ${isMobileSidebar ? "full" : ""}`}>
                    <div id="market-header">
                        <div className="market-header flex items-center justify-between">
                            <div className="widget-search">
                                <form action="#" method="get" role="search" className="search-form relative">
                                    <input type="search" id="search" className="search-field style-1" placeholder="Search artwork, collection..." name="s" title="Search for" required />
                                    <button className="search search-submit" type="submit" title="Search">
                                        <i className="icon-search" />
                                    </button>
                                </form>
                            </div>
                            <div className="admin_active" id="header_admin">
                                <div className="popup-notification relative">
                                    <div className="notification" onClick={handleToggle2}>
                                        <svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 18.8476C17.6392 18.8476 20.2481 18.1242 20.5 15.2205C20.5 12.3188 18.6812 12.5054 18.6812 8.94511C18.6812 6.16414 16.0452 3 12 3C7.95477 3 5.31885 6.16414 5.31885 8.94511C5.31885 12.5054 3.5 12.3188 3.5 15.2205C3.75295 18.1352 6.36177 18.8476 12 18.8476Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.3888 21.8574C13.0247 23.3721 10.8967 23.3901 9.51947 21.8574" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx={17} cy={5} r={4} fill="#DDF247" stroke="#1D1D1D" strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                    <div className={`avatar_popup ${isToggled2 ? "visible" : ""}`}>
                                        <h5 className="mb-30">Notification</h5>
                                        <div className="widget-recently">
                                            <div className="card-small">
                                                <div className="author">
                                                    <img src="assets/images/blog/sidebar-06.jpg" alt="" />
                                                    <div className="info">
                                                        <h6><Link href="#">Propw</Link></h6>
                                                        <p><Link href="#">@themes</Link></p>
                                                    </div>
                                                </div>
                                                <span className="date">Mon, 08 May </span>
                                            </div>
                                            <div className="card-small">
                                                <div className="author">
                                                    <img src="assets/images/blog/sidebar-06.jpg" alt="" />
                                                    <div className="info">
                                                        <h6><Link href="#">Propw</Link></h6>
                                                        <p><Link href="#">@themes</Link></p>
                                                    </div>
                                                </div>
                                                <span className="date">Mon, 08 May </span>
                                            </div>
                                            <div className="card-small">
                                                <div className="author">
                                                    <img src="assets/images/blog/sidebar-06.jpg" alt="" />
                                                    <div className="info">
                                                        <h6><Link href="#">Propw</Link></h6>
                                                        <p><Link href="#">@themes</Link></p>
                                                    </div>
                                                </div>
                                                <span className="date">Mon, 08 May </span>
                                            </div>
                                            <div className="card-small">
                                                <div className="author">
                                                    <img src="assets/images/blog/sidebar-06.jpg" alt="" />
                                                    <div className="info">
                                                        <h6><Link href="#">Propw</Link></h6>
                                                        <p><Link href="#">@themes</Link></p>
                                                    </div>
                                                </div>
                                                <span className="date">Mon, 08 May </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="popup-user relative">
                                    <div className="user" onClick={handleToggle}>
                                        <img src={user?.avatar} alt="" />
                                        <span>{user?.name}<i className="icon-keyboard_arrow_down" /></span>
                                    </div>
                                    <div className={`avatar_popup2 ${isToggled ? "visible" : ""}`}>
                                        <div >
                                            <div className="links">
                                                <Link className="block mb-30" href="/profile">
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
                            </div>
                        </div>
                    </div>
                    <div className={`btn-canvas ${isMobileSidebar ? "" : "active"}`}>
                        <div className="canvas" onClick={handleMobileSidebar}>
                            <span />
                        </div>
                    </div>
                    <div className="flat-tabs">
                        <div className={`section-menu-left ${isMobileSidebar ? "null" : ""}`}>
                            <div className="box-logo">
                                <Link href=""><img src="assets/images/logo/logo.png" alt="" /></Link>
                            </div>
                            <div className="create menu-tab">
                                <a className="tf-button style-1 type-1 tablinks" data-tabs="create" onClick={() => handleOnClick(9)}>
                                    <span>Create</span>
                                    <i className="icon-create" />
                                </a>
                            </div>
                            <div className="over-content">
                                <div className="content">
                                    <h6>Projects</h6>
                                    <ul className="menu-tab">
                                        <li className={activeIndex === 1 ? "tablinks active" : "tablinks"} data-tabs="market" onClick={() => handleOnClick(1)}>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path d="M6.75731 9.35159V15.64" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11.0351 6.34253V15.64" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.2431 12.6746V15.6401" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.2954 1.83334H6.70492C3.71048 1.83334 1.8335 3.95275 1.8335 6.95307V15.0469C1.8335 18.0473 3.70175 20.1667 6.70492 20.1667H15.2954C18.2986 20.1667 20.1668 18.0473 20.1668 15.0469V6.95307C20.1668 3.95275 18.2986 1.83334 15.2954 1.83334Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6.71982 1.83371H15.2806C18.3982 1.83371 20.1582 3.60196 20.1673 6.71954V15.2812C20.1673 18.3979 18.3982 20.167 15.2806 20.167H6.71982C3.60223 20.167 1.83398 18.3979 1.83398 15.2812V6.71954C1.83398 3.60196 3.60223 1.83371 6.71982 1.83371ZM11.0456 16.372C11.4407 16.372 11.7697 16.0787 11.8064 15.6845V6.34371C11.8431 6.05954 11.7065 5.77446 11.459 5.61954C11.2014 5.46371 10.8897 5.46371 10.6432 5.61954C10.3947 5.77446 10.2582 6.05954 10.2847 6.34371V15.6845C10.3315 16.0787 10.6606 16.372 11.0456 16.372ZM15.2628 16.372C15.6478 16.372 15.9769 16.0787 16.0237 15.6845V12.6779C16.0502 12.3836 15.9137 12.1095 15.6652 11.9537C15.4187 11.7979 15.107 11.7979 14.8503 11.9537C14.6019 12.1095 14.4653 12.3836 14.502 12.6779V15.6845C14.5387 16.0787 14.8677 16.372 15.2628 16.372ZM7.534 15.6845C7.49734 16.0787 7.16825 16.372 6.77317 16.372C6.379 16.372 6.049 16.0787 6.01325 15.6845V9.35038C5.98575 9.0653 6.12234 8.78205 6.37075 8.62621C6.61734 8.47038 6.92992 8.47038 7.17742 8.62621C7.424 8.78205 7.56242 9.0653 7.534 9.35038V15.6845Z" fill="#DDF247" />
                                            </svg>
                                            Projects
                                        </li>
                                    </ul>
                                </div>
                                <div className="content mt-30">
                                    <h6>Account</h6>
                                    <ul className="menu-tab">
                                        <li className={activeIndex === 4 ? "tablinks active" : "tablinks"} data-tabs="tf-collection" onClick={() => handleOnClick(4)}>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <mask id="mask0_1075_14628" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={1} y={1} width={20} height={20}>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.83398 1.83334H20.8059V20.7798H1.83398V1.83334Z" fill="white" />
                                                    </mask>
                                                    <g mask="url(#mask0_1075_14628)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.00673 3.20834C4.34473 3.20834 3.20898 4.56134 3.20898 7.73026V14.8793C3.20898 17.798 4.82048 19.4049 7.74648 19.4049H14.88C17.7987 19.4049 19.4056 17.798 19.4056 14.8793V14.8766L19.4312 10.3253C19.4312 7.20959 18.3624 5.99501 15.617 5.99501H13.0228C12.1529 5.99409 11.3224 5.57884 10.7999 4.88401L9.96299 3.77118C9.6999 3.41826 9.27915 3.20926 8.83915 3.20834H7.00673ZM14.88 20.7799H7.74648C4.09998 20.7799 1.83398 18.5185 1.83398 14.8793V7.73026C1.83398 3.81701 3.57473 1.83334 7.00673 1.83334H8.84007C9.71182 1.83426 10.5423 2.25043 11.063 2.94618L11.8981 4.05718C12.163 4.40918 12.5837 4.61909 13.0237 4.62001H15.617C19.1572 4.62001 20.8062 6.43409 20.8062 10.329L20.7806 14.8821C20.7797 18.5194 18.5192 20.7799 14.88 20.7799Z" fill="white" />
                                                    </g>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.3235 14.4034H7.31641C6.93691 14.4034 6.62891 14.0954 6.62891 13.7159C6.62891 13.3364 6.93691 13.0284 7.31641 13.0284H15.3235C15.703 13.0284 16.011 13.3364 16.011 13.7159C16.011 14.0954 15.703 14.4034 15.3235 14.4034Z" fill="white" />
                                                </g>
                                            </svg>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.3279 4.47353H15.142C18.5245 4.47353 20.1745 6.27936 20.1654 9.9827V14.4469C20.1654 17.9852 17.9837 20.1669 14.4362 20.1669H7.55203C4.02286 20.1669 1.83203 17.9852 1.83203 14.4377V7.55353C1.83203 3.75853 3.5187 1.83353 6.8462 1.83353H8.29453C9.14795 1.82436 9.94453 2.21853 10.467 2.8877L11.2737 3.9602C11.5304 4.28103 11.9154 4.47353 12.3279 4.47353ZM6.75391 14.016H15.2422C15.6181 14.016 15.9206 13.7044 15.9206 13.3285C15.9206 12.9435 15.6181 12.641 15.2422 12.641H6.75391C6.36891 12.641 6.06641 12.9435 6.06641 13.3285C6.06641 13.7044 6.36891 14.016 6.75391 14.016Z" fill="#DDF247" />
                                            </svg>
                                            Profile
                                        </li>
                                        <li className={activeIndex === 5 ? "tablinks active" : "tablinks"} data-tabs="favorite" onClick={() => handleOnClick(5)}>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.63385 10.6318C1.65026 7.56096 2.79976 4.05104 6.02368 3.01246C7.71951 2.46521 9.59135 2.78788 11.0012 3.84846C12.3349 2.81721 14.2755 2.46888 15.9695 3.01246C19.1934 4.05104 20.3503 7.56096 19.3676 10.6318C17.8368 15.4993 11.0012 19.2485 11.0012 19.2485C11.0012 19.2485 4.21601 15.5561 2.63385 10.6318Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14.668 6.14166C15.6488 6.45883 16.3418 7.33425 16.4252 8.36183" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.5279 2.29232C15.1063 2.29232 15.6838 2.3739 16.2329 2.55815C19.6163 3.65815 20.8355 7.37066 19.817 10.6157C19.2395 12.2739 18.2954 13.7873 17.0588 15.0239C15.2887 16.7381 13.3463 18.2597 11.2554 19.5706L11.0262 19.709L10.7879 19.5614C8.68963 18.2597 6.73621 16.7381 4.94963 15.0147C3.7213 13.7782 2.77621 12.2739 2.18955 10.6157C1.15371 7.37066 2.37288 3.65815 5.79296 2.5389C6.0588 2.44724 6.33288 2.38307 6.60788 2.34732H6.71788C6.97546 2.30974 7.23121 2.29232 7.48788 2.29232H7.58871C8.16621 2.30974 8.72538 2.41057 9.26713 2.59482H9.32121C9.35788 2.61224 9.38538 2.63149 9.40371 2.6489C9.6063 2.71399 9.79788 2.78732 9.98121 2.88815L10.3295 3.04399C10.4137 3.08888 10.5082 3.15747 10.5898 3.21675C10.6416 3.25431 10.6882 3.28813 10.7237 3.30982C10.7387 3.31865 10.7539 3.32752 10.7692 3.33647C10.8478 3.38235 10.9297 3.43014 10.9987 3.48307C12.0171 2.70482 13.2537 2.28315 14.5279 2.29232ZM16.9674 8.8923C17.3432 8.88222 17.6641 8.58063 17.6916 8.19472V8.08563C17.7191 6.80138 16.9408 5.63813 15.7574 5.18897C15.3816 5.05972 14.9691 5.2623 14.8316 5.6473C14.7032 6.0323 14.9049 6.45397 15.2899 6.59055C15.8775 6.81055 16.2707 7.38897 16.2707 8.02972V8.05813C16.2533 8.26805 16.3166 8.47063 16.4449 8.62647C16.5732 8.7823 16.7657 8.87305 16.9674 8.8923Z" fill="#DDF247" />
                                            </svg>
                                            My collection
                                        </li>
                                        <li className={activeIndex === 7 ? "tablinks active" : "tablinks"} data-tabs="history" onClick={() => handleOnClick(7)}>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.0269 3.20831C4.70773 3.20831 3.20898 4.7969 3.20898 7.25631V14.7436C3.20898 17.2031 4.70773 18.7916 7.0269 18.7916H14.9726C17.2927 18.7916 18.7923 17.2031 18.7923 14.7436V7.25631C18.7923 4.7969 17.2936 3.20831 14.9735 3.20831H7.0269ZM14.9726 20.1666H7.0269C3.92032 20.1666 1.83398 17.9868 1.83398 14.7436V7.25631C1.83398 4.01315 3.92032 1.83331 7.0269 1.83331H14.9735C18.0801 1.83331 20.1673 4.01315 20.1673 7.25631V14.7436C20.1673 17.9868 18.0801 20.1666 14.9726 20.1666Z" fill="white" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.1084 13.5369C13.9883 13.5369 13.8673 13.5058 13.7564 13.4407L10.648 11.5863C10.4408 11.4616 10.3125 11.237 10.3125 10.9959V6.99744C10.3125 6.61794 10.6205 6.30994 11 6.30994C11.3795 6.30994 11.6875 6.61794 11.6875 6.99744V10.6054L14.4613 12.2582C14.7867 12.4534 14.894 12.8751 14.6997 13.2014C14.5704 13.4169 14.3422 13.5369 14.1084 13.5369Z" fill="white" />
                                                </g>
                                            </svg>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.03051 1.83337H14.978C18.0855 1.83337 20.1663 4.01412 20.1663 7.25912V14.7483C20.1663 17.985 18.0855 20.1667 14.978 20.1667H7.03051C3.92301 20.1667 1.83301 17.985 1.83301 14.7483V7.25912C1.83301 4.01412 3.92301 1.83337 7.03051 1.83337ZM14.2813 14.4925C14.5105 14.4925 14.7397 14.3734 14.868 14.1534C15.0697 13.8316 14.9597 13.41 14.6297 13.2092L11.3663 11.2659V7.02996C11.3663 6.65504 11.0638 6.34246 10.6788 6.34246C10.303 6.34246 9.99134 6.65504 9.99134 7.02996V11.66C9.99134 11.8984 10.1197 12.1275 10.3305 12.2467L13.9238 14.3917C14.0338 14.465 14.1622 14.4925 14.2813 14.4925Z" fill="#DDF247" />
                                            </svg>
                                            History
                                        </li>
                                        <li>
                                            <Link href="/">Logout</Link>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path d="M13.7627 6.77369V5.91844C13.7627 4.05303 12.2502 2.54053 10.3848 2.54053H5.91606C4.05156 2.54053 2.53906 4.05303 2.53906 5.91844V16.1209C2.53906 17.9864 4.05156 19.4989 5.91606 19.4989H10.394C12.2539 19.4989 13.7627 17.9909 13.7627 16.131V15.2666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M19.9907 11.0196H8.95312" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M17.3047 8.34741L19.9887 11.0195L17.3047 13.6925" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.0709 10.2942C8.66986 10.2942 8.35275 10.6059 8.35275 11C8.35275 11.385 8.66986 11.7059 9.0709 11.7059H14.6668V16.0875C14.6668 18.3334 12.8108 20.1667 10.5165 20.1667H5.97448C3.68948 20.1667 1.8335 18.3425 1.8335 16.0967V5.91254C1.8335 3.65754 3.69881 1.83337 5.98381 1.83337H10.5352C12.8108 1.83337 14.6668 3.65754 14.6668 5.90337V10.2942H9.0709ZM17.9945 7.82856L20.6712 10.4961C20.8087 10.6336 20.882 10.8077 20.882 11.0002C20.882 11.1836 20.8087 11.3669 20.6712 11.4952L17.9945 14.1627C17.857 14.3002 17.6737 14.3736 17.4995 14.3736C17.3162 14.3736 17.1328 14.3002 16.9953 14.1627C16.7203 13.8877 16.7203 13.4386 16.9953 13.1636L18.462 11.7061H14.667V10.2944H18.462L16.9953 8.83689C16.7203 8.56189 16.7203 8.11272 16.9953 7.83772C17.2703 7.55356 17.7195 7.55356 17.9945 7.82856Z" fill="#DDF247" />
                                            </svg>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bottom">
                                <p>© 2024 RoFundMe</p>
                                <p>Made By Terry</p>
                            </div>
                        </div>
                        <div className="content-tabs">
                            <div id="create" className={activeIndex === 9 ? "tabcontent active" : "tabcontent"}>
                                <Create user={user} />
                            </div>
                            <div id="all-project" className={activeIndex === 1 ? "tabcontent active" : "tabcontent"}>
                                <AllProjects activeIndex={activeIndex} />
                            </div>
                            <div id="bid" className={activeIndex === 2 ? "tabcontent active" : "tabcontent"}>
                                <ActiveBid />
                            </div>
                            <div id="explore" className={activeIndex === 3 ? "tabcontent active" : "tabcontent"}>
                                <Explore />
                            </div>
                            <div id="tf-collection" className={activeIndex === 4 ? "tabcontent active justify-center" : "tabcontent"}>
                                <Profile />
                            </div>
                            <div id="favorite" className={activeIndex === 5 ? "tabcontent active" : "tabcontent"}>
                                <Favourite />
                            </div>
                            <div id="wallet" className={activeIndex === 6 ? "tabcontent active" : "tabcontent"}>
                                <Wallet />
                            </div>
                            <div id="history" className={activeIndex === 7 ? "tabcontent active" : "tabcontent"}>
                                <History />
                            </div>
                            <div id="settings" className={activeIndex === 8 ? "tabcontent active" : "tabcontent"}>
                                <Settings />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade popup" id="popup_bid" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-body">
                                <div className="image">
                                    <img src="assets/images/backgroup-section/popup.png" alt="" />
                                </div>
                                <div className="logo-rotate">
                                    <img src="assets/images/item-background/item6-img.png" alt="" />
                                </div>
                                <h2>Subscribe to our newsletter</h2>
                                <p>Subscribe for our newsletter to stay in the loop</p>
                                <fieldset className="email">
                                    <input type="email" className="style-1" id="email" placeholder="Email address*" name="email" tabIndex={2} aria-required="true" required />
                                </fieldset>
                                <Link href="#" className="tf-button style-1 h50">Subscribe<i className="icon-arrow-up-right2" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}