import React, { useEffect, useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
    const [selectedImage, setSelectedImage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`${BACKEND_API}/users/single/${jwtDecode(localStorage.getItem('token')).id}`)
            .then(res => {
                setUser(res.data);
            })
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUser({ ...user, avatar: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        const userId = jwtDecode(localStorage.getItem('token')).id;

        formData.append('userId', userId);
        formData.append('firstName', user?.firstName);
        formData.append('lastName', user?.lastName);
        formData.append('email', user?.email);
        formData.append('country', user?.country);
        formData.append('state', user?.state);
        formData.append('ciry', user?.ciry);
        formData.append('address', user?.address);
        formData.append('zipCode', user?.zipCode);
        formData.append('avatar', user?.avatar);

        try {
            await axios.put(`${BACKEND_API}/users/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Updated user profile successfully.');
        } catch (error) {
            toast.error('Failed to update user profile.');
        }
    }

    return (
        <>
            <div className="flex row wrapper-content">
                <div className='col-4 widget-edit mb-30 profile flex flex-col align-center justify-center'>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-file-input"
                        onChange={handleImageUpload}
                    />
                    <img
                        src={selectedImage ? selectedImage : user?.avatar}
                        alt="User Avatar"
                        style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'fill',
                            borderRadius: '50%'
                        }}
                        onClick={() => document.getElementById('avatar-file-input').click()}
                    />

                    <div className="flex flex-col mt-4 widget-social">
                        <ul className="flex">
                            <li><Link href="#" className="icon-facebook" /></li>
                            <li><Link href="#" className="icon-twitter" /></li>
                            <li><Link href="#" className="icon-vt" /></li>
                            <li><Link href="#" className="icon-tiktok" /></li>
                            <li><Link href="#" className="icon-youtube" /></li>
                        </ul>
                    </div>
                </div>
                <div className='col-7 widget-edit mb-30 profile mr-0 ml-auto'>
                    <div className="flex gap20">
                        <input
                            type="text"
                            id="first-name"
                            name="first-name"
                            placeholder='First Name'
                            className="mb-3 mt-3"
                            value={user?.firstName}
                            onChange={e => setUser({ ...user, firstName: e.target.value })}
                        />

                        <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            placeholder='Last Name'
                            className="mb-3 mt-3"
                            value={user?.lastName}
                            onChange={e => setUser({ ...user, lastName: e.target.value })}
                        />
                    </div>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        className="mb-3 mt-3"
                        value={user?.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                    />

                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder='Address'
                        className="mb-3 mt-3"
                        value={user?.address}
                        onChange={e => setUser({ ...user, address: e.target.value })}
                    />
                    <div className="flex gap20">
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder='City'
                            className="mb-3 mt-3"
                            value={user?.city}
                            onChange={e => setUser({ ...user, city: e.target.value })}
                        />

                        <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder='State'
                            className="mb-3 mt-3"
                            value={user?.state}
                            onChange={e => setUser({ ...user, state: e.target.value })}
                        />
                    </div>

                    <div className="flex gap20">
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder='Country'
                            className="mb-3 mt-3"
                            value={user?.country}
                            onChange={e => setUser({ ...user, country: e.target.value })}
                        />

                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder='Zip Code'
                            className="mb-3 mt-3"
                            value={user?.zipCode}
                            onChange={e => setUser({ ...user, zipCode: e.target.value })}
                        />
                    </div>
                </div>
                <div className="widget-edit mb-30 setting col-12">
                    <div className="title">
                        <h4>Notification setting</h4>
                        <i className="icon-keyboard_arrow_up" />
                    </div>
                    <form id="commentform" className="comment-form" noValidate="novalidate">
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6>Order confirmation</h6>
                                <p>will be notified when customer order any project</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" defaultChecked />
                        </div>
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6>New Projects Notification</h6>
                                <p>Get notified instantly whenever new projects are posted on the platform</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" />
                        </div>
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6>Payment Card Notification</h6>
                                <p>Receive instant notifications when a payment card is added or updated on your account</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" defaultChecked />
                        </div>
                        <div className="notification-setting-item">
                            <div className="content">
                                <h6>Email notification</h6>
                                <p>Turn on email notification to get updates through email</p>
                            </div>
                            <input className="check" type="checkbox" defaultValue="checkbox" name="check" />
                        </div>
                    </form>
                </div>

                <button className="w-full" onClick={handleSubmit}>Save</button>
            </div>
        </>
    )
}
