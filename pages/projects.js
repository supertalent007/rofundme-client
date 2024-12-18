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

    const [activeIndex, setActiveIndex] = useState(1)
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
                setUser(res.data);
            })
            .catch(err => {
                console.error('Failed to get transaction data:', err);
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
                                                <Link className="flex align-center mb-20" href="/profile">
                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.774902 18.333C0.774902 18.7932 1.14762 19.1664 1.60824 19.1664C2.06885 19.1664 2.44157 18.7932 2.44157 18.333C2.44157 15.3923 4.13448 12.7889 6.77329 11.5578C7.68653 12.1513 8.77296 12.4997 9.94076 12.4997C11.113 12.4997 12.2036 12.1489 13.119 11.5513C13.9067 11.9232 14.6368 12.4235 15.2443 13.0307C16.6611 14.4479 17.4416 16.3311 17.4416 18.333C17.4416 18.7932 17.8143 19.1664 18.2749 19.1664C18.7355 19.1664 19.1083 18.7932 19.1083 18.333C19.1083 15.8859 18.1545 13.5845 16.4227 11.8523C15.8432 11.2725 15.1698 10.7754 14.4472 10.3655C15.2757 9.3581 15.7741 8.06944 15.7741 6.66635C15.7741 3.44979 13.1569 0.833008 9.94076 0.833008C6.72461 0.833008 4.10742 3.44979 4.10742 6.66635C4.10742 8.06604 4.60379 9.35154 5.42863 10.3579C2.56796 11.9685 0.774902 14.9779 0.774902 18.333V18.333ZM9.94076 2.49968C12.2381 2.49968 14.1074 4.36898 14.1074 6.66635C14.1074 8.96371 12.2381 10.833 9.94076 10.833C7.6434 10.833 5.77409 8.96371 5.77409 6.66635C5.77409 4.36898 7.6434 2.49968 9.94076 2.49968V2.49968Z" fill="white" />
                                                    </svg>
                                                    <span>My Profile</span>
                                                </Link>
                                                <Link className="flex align-center" href="/" id="logout" onClick={handleLogout}>
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
                                        {/* <li className={activeIndex === 2 ? "tablinks active" : "tablinks"} data-tabs="bid" onClick={() => handleOnClick(2)}>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.61499 14.6693C6.46832 14.6693 6.32074 14.6226 6.19607 14.5272C5.89541 14.2953 5.83857 13.8636 6.07049 13.5629L8.81407 9.99708C8.92591 9.85133 9.09182 9.75691 9.27332 9.73399C9.45849 9.71016 9.63999 9.76149 9.78391 9.87608L12.3689 11.9065L14.6303 8.98874C14.8632 8.68716 15.294 8.63124 15.5947 8.86591C15.8953 9.09874 15.9503 9.53049 15.7175 9.83024L13.0317 13.2952C12.9198 13.4401 12.7548 13.5345 12.5733 13.5565C12.39 13.5812 12.2085 13.5281 12.0637 13.4153L9.48049 11.3858L7.16041 14.4007C7.02474 14.5767 6.82124 14.6693 6.61499 14.6693Z" fill="white" />
                                                    <mask id="mask0_1075_3648" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={15} y={1} width={6} height={6}>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.8555 1.83344H20.7541V6.73293H15.8555V1.83344Z" fill="white" />
                                                    </mask>
                                                    <g mask="url(#mask0_1075_3648)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.3048 3.20834C17.7126 3.20834 17.2305 3.68959 17.2305 4.28268C17.2305 4.87484 17.7126 5.35793 18.3048 5.35793C18.897 5.35793 19.3791 4.87484 19.3791 4.28268C19.3791 3.68959 18.897 3.20834 18.3048 3.20834ZM18.3048 6.73293C16.9546 6.73293 15.8555 5.63384 15.8555 4.28268C15.8555 2.93151 16.9546 1.83334 18.3048 1.83334C19.656 1.83334 20.7541 2.93151 20.7541 4.28268C20.7541 5.63384 19.656 6.73293 18.3048 6.73293Z" fill="white" />
                                                    </g>
                                                    <mask id="mask1_1075_3648" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={1} y={2} width={20} height={19}>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.83398 2.60526H20.0407V20.8112H1.83398V2.60526Z" fill="white" />
                                                    </mask>
                                                    <g mask="url(#mask1_1075_3648)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.8809 20.8112H6.9939C3.90748 20.8112 1.83398 18.6433 1.83398 15.4166V8.00809C1.83398 4.77684 3.90748 2.60526 6.9939 2.60526H13.6562C14.0357 2.60526 14.3437 2.91326 14.3437 3.29276C14.3437 3.67226 14.0357 3.98026 13.6562 3.98026H6.9939C4.6949 3.98026 3.20898 5.56059 3.20898 8.00809V15.4166C3.20898 17.8962 4.65915 19.4362 6.9939 19.4362H14.8809C17.1799 19.4362 18.6658 17.8586 18.6658 15.4166V8.96417C18.6658 8.58467 18.9738 8.27667 19.3533 8.27667C19.7328 8.27667 20.0408 8.58467 20.0408 8.96417V15.4166C20.0408 18.6433 17.9673 20.8112 14.8809 20.8112Z" fill="white" />
                                                    </g>
                                                </g>
                                            </svg>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M15.7481 4.0425C15.7481 2.82333 16.7381 1.83333 17.9573 1.83333C19.1764 1.83333 20.1664 2.82333 20.1664 4.0425C20.1664 5.26166 19.1764 6.25166 17.9573 6.25166C16.7381 6.25166 15.7481 5.26166 15.7481 4.0425ZM12.2188 13.5294L14.868 10.1111L14.8313 10.1294C14.978 9.92777 15.0055 9.6711 14.9047 9.44194C14.8048 9.21277 14.5838 9.05694 14.3464 9.0386C14.098 9.0111 13.8514 9.1211 13.7038 9.32277L11.4864 12.1919L8.94634 10.1936C8.79051 10.0744 8.60717 10.0277 8.42384 10.0469C8.24142 10.0744 8.07642 10.1744 7.96551 10.321L5.25309 13.8511L5.19717 13.9336C5.04134 14.226 5.11467 14.6019 5.38967 14.8044C5.51801 14.8869 5.65551 14.9419 5.81134 14.9419C6.02309 14.9511 6.22384 14.8402 6.35217 14.6669L8.65301 11.7052L11.2655 13.6678L11.348 13.7219C11.6413 13.8777 12.008 13.8053 12.2188 13.5294ZM14.1622 3.46527C14.1255 3.69444 14.1072 3.9236 14.1072 4.15277C14.1072 6.21527 15.7755 7.88269 17.8288 7.88269C18.058 7.88269 18.278 7.8561 18.5072 7.81944V15.216C18.5072 18.3244 16.6738 20.1669 13.5572 20.1669H6.78392C3.66634 20.1669 1.83301 18.3244 1.83301 15.216V8.4336C1.83301 5.31694 3.66634 3.46527 6.78392 3.46527H14.1622Z" fill="#DDF247" />
                                            </svg>
                                            Active Bid
                                        </li>
                                        <li className={activeIndex === 3 ? "tablinks active" : "tablinks"} data-tabs="explore" onClick={() => handleOnClick(3)}>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.73177 3.20834C3.21094 3.20834 3.21094 3.39901 3.21094 5.72918V5.75209C3.21094 6.76684 3.21094 7.50018 3.45935 7.81001C3.70227 8.11068 4.42369 8.25001 5.73177 8.25001C7.03985 8.25001 7.76127 8.10976 8.00419 7.80909C8.2526 7.50018 8.2526 6.76684 8.2526 5.75118C8.2526 3.39901 8.2526 3.20834 5.73177 3.20834ZM5.73177 9.62501C4.18627 9.62501 3.02669 9.46276 2.3896 8.67168C1.83594 7.98509 1.83594 7.04826 1.83594 5.75209L2.52344 5.72918H1.83594C1.83594 3.09834 2.00185 1.83334 5.73177 1.83334C9.46169 1.83334 9.6276 3.09834 9.6276 5.72918C9.6276 7.04734 9.6276 7.98509 9.07394 8.67168C8.43685 9.46276 7.27727 9.62501 5.73177 9.62501Z" fill="white" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8177 3.20834C13.2969 3.20834 13.2969 3.39901 13.2969 5.72918V5.75209C13.2969 6.76684 13.2969 7.50018 13.5453 7.81001C13.7882 8.11068 14.5096 8.25001 15.8177 8.25001C17.1258 8.25001 17.8472 8.10976 18.0901 7.80909C18.3385 7.50018 18.3385 6.76684 18.3385 5.75118C18.3385 3.39901 18.3385 3.20834 15.8177 3.20834ZM15.8177 9.62501C14.2722 9.62501 13.1126 9.46276 12.4755 8.67168C11.9219 7.98509 11.9219 7.04826 11.9219 5.75209L12.6094 5.72918H11.9219C11.9219 3.09834 12.0878 1.83334 15.8177 1.83334C19.5476 1.83334 19.7135 3.09834 19.7135 5.72918C19.7135 7.04734 19.7135 7.98509 19.1599 8.67168C18.5228 9.46276 17.3632 9.62501 15.8177 9.62501Z" fill="white" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.73177 13.2917C3.21094 13.2917 3.21094 13.4824 3.21094 15.8125V15.8354C3.21094 16.8502 3.21094 17.5835 3.45935 17.8934C3.70227 18.194 4.42369 18.3334 5.73177 18.3334C7.03985 18.3334 7.76127 18.1931 8.00419 17.8924C8.2526 17.5835 8.2526 16.8502 8.2526 15.8345C8.2526 13.4824 8.2526 13.2917 5.73177 13.2917ZM5.73177 19.7084C4.18627 19.7084 3.02669 19.5461 2.3896 18.755C1.83594 18.0684 1.83594 17.1316 1.83594 15.8354L2.52344 15.8125H1.83594C1.83594 13.1817 2.00185 11.9167 5.73177 11.9167C9.46169 11.9167 9.6276 13.1817 9.6276 15.8125C9.6276 17.1307 9.6276 18.0684 9.07394 18.755C8.43685 19.5461 7.27727 19.7084 5.73177 19.7084Z" fill="white" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8177 13.2917C13.2969 13.2917 13.2969 13.4824 13.2969 15.8125V15.8354C13.2969 16.8502 13.2969 17.5835 13.5453 17.8934C13.7882 18.194 14.5096 18.3334 15.8177 18.3334C17.1258 18.3334 17.8472 18.1931 18.0901 17.8924C18.3385 17.5835 18.3385 16.8502 18.3385 15.8345C18.3385 13.4824 18.3385 13.2917 15.8177 13.2917ZM15.8177 19.7084C14.2722 19.7084 13.1126 19.5461 12.4755 18.755C11.9219 18.0684 11.9219 17.1316 11.9219 15.8354L12.6094 15.8125H11.9219C11.9219 13.1817 12.0878 11.9167 15.8177 11.9167C19.5476 11.9167 19.7135 13.1817 19.7135 15.8125C19.7135 17.1307 19.7135 18.0684 19.1599 18.755C18.5228 19.5461 17.3632 19.7084 15.8177 19.7084Z" fill="white" />
                                                </g>
                                            </svg>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.16134 1.83334H7.25967C8.55217 1.83334 9.58801 2.88751 9.58801 4.18093V7.30584C9.58801 8.60751 8.55217 9.65251 7.25967 9.65251H4.16134C2.87801 9.65251 1.83301 8.60751 1.83301 7.30584V4.18093C1.83301 2.88751 2.87801 1.83334 4.16134 1.83334ZM4.16134 12.3472H7.25967C8.55217 12.3472 9.58801 13.3932 9.58801 14.6948V17.8197C9.58801 19.1122 8.55217 20.1664 7.25967 20.1664H4.16134C2.87801 20.1664 1.83301 19.1122 1.83301 17.8197V14.6948C1.83301 13.3932 2.87801 12.3472 4.16134 12.3472ZM17.8381 1.83334H14.7398C13.4473 1.83334 12.4114 2.88751 12.4114 4.18093V7.30584C12.4114 8.60751 13.4473 9.65251 14.7398 9.65251H17.8381C19.1214 9.65251 20.1664 8.60751 20.1664 7.30584V4.18093C20.1664 2.88751 19.1214 1.83334 17.8381 1.83334ZM14.7398 12.3472H17.8381C19.1214 12.3472 20.1664 13.3932 20.1664 14.6948V17.8197C20.1664 19.1122 19.1214 20.1664 17.8381 20.1664H14.7398C13.4473 20.1664 12.4114 19.1122 12.4114 17.8197V14.6948C12.4114 13.3932 13.4473 12.3472 14.7398 12.3472Z" fill="#DDF247" />
                                            </svg>
                                            Explore
                                        </li> */}
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
                                            <Link href="/">Back</Link>
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