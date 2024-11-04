import { useEffect, useState } from "react"
import Link from 'next/link'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function Create({ user }) {
    const [activeIndex, setActiveIndex] = useState(1);
    const [project, setProject] = useState({
        title: '',
        description: '',
        category: null,
        launchDate: '',
        duration: 30,
        goal: 0,
        imageFile: null
    });

    const [filePreviewUrl, setFilePreviewUrl] = useState(null);
    const [mediaItems, setMediaItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            window.location.replace('/login');
        }
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOnClick = (id) => {
        setActiveIndex(id);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProject(prevState => ({ ...prevState, imageFile: file }));

        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setFilePreviewUrl(fileUrl);
        }
    };

    const handleDescriptionChange = (value) => {
        setProject(prevProject => ({ ...prevProject, description: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', user?._id);
        formData.append('title', project.title);
        formData.append('description', project.description);
        formData.append('category', project.category);
        formData.append('launchDate', project.launchDate);
        formData.append('duration', project.duration);
        formData.append('goal', project.goal);

        if (project.imageFile) {
            formData.append('image', project.imageFile);
        }

        mediaItems.forEach((item, index) => {
            formData.append('mediaFiles', item.file);
            formData.append(`mediaDescriptions[${index}]`, item.description || '');
            formData.append(`mediaTypes[${index}]`, item.type || '');
        });

        rewards.forEach((reward, index) => {
            formData.append('rewardFiles', reward?.imageFile);
            formData.append(`rewardTitles[${index}]`, reward?.title || '');
            formData.append(`rewardDescriptions[${index}]`, reward?.description || '');
            formData.append(`rewardAmounts[${index}]`, reward?.amount || '');
        });

        try {
            await axios.post(`${BACKEND_API}/projects/new`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Created a new project.');
            setProject({
                title: '',
                description: '',
                category: null,
                launchDate: '',
                duration: 30,
                goal: 0,
                imageFile: null
            });
            setFilePreviewUrl(null);
            setMediaItems([]);
            setRewards([]);
            window.location.replace('/projects');
        } catch (error) {
            console.error('Error uploading project:', error);
            toast.error('Failed to create project.');
        }
    };

    return (
        <>
            <div className="wrapper-content-create">
                <div className="heading-section">
                    <h2 className="tf-title pb-30">Create a new Project</h2>
                </div>
                <div className="widget-tabs relative">
                    <ul className="widget-menu-tab">
                        <li className={activeIndex === 1 ? "item-title active" : "item-title"} onClick={() => handleOnClick(1)}>
                            <span className="inner"><span className="order">1</span>Overview <i className="icon-keyboard_arrow_right" /></span>
                        </li>
                        <li className={activeIndex === 2 ? "item-title active" : "item-title"} onClick={() => handleOnClick(2)}>
                            <span className="inner"><span className="order">2</span>Assets <i className="icon-keyboard_arrow_right" /> </span>
                        </li>
                        <li className={activeIndex === 3 ? "item-title active" : "item-title"} onClick={() => handleOnClick(3)}>
                            <span className="inner"><span className="order">3</span>Rewards </span>
                        </li>
                    </ul>
                    <div className="widget-content-tab">
                        <div className={activeIndex === 1 ? "widget-content-inner description active" : "widget-content-inner description"} style={{ display: `${activeIndex == 1 ? "" : "none"}` }}>
                            <div className="wrap-content force-w-full">
                                <form id="commentform" className="comment-form" noValidate="novalidate">
                                    <fieldset className="upload">
                                        <button
                                            className="tf-button h50 active force-w-full"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(`file-input-main`).click();
                                            }}
                                        >
                                            <img
                                                src="/assets/images/action-item/upload.png"
                                                alt="Upload"
                                                style={{ cursor: 'pointer', width: '40px' }}
                                            />
                                            Upload
                                        </button>
                                        <input
                                            id={`file-input-main`}
                                            type="file"
                                            accept="image/*,video/*"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </fieldset>
                                    {filePreviewUrl && (
                                        <div className="file-preview">
                                            {project.imageFile.type.startsWith('image/') ? (
                                                <img src={filePreviewUrl} alt="File Preview" />
                                            ) : (
                                                <video controls>
                                                    <source src={filePreviewUrl} type={project.imageFile.type} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                    )}
                                    <fieldset className="name">
                                        <label>Project title *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Project title"
                                            name="name"
                                            tabIndex={2}
                                            aria-required="true"
                                            required
                                            value={project.title}
                                            onChange={e => setProject({ ...project, title: e.target.value })}
                                        />
                                    </fieldset>
                                    <fieldset className="message">
                                        <label>Description *</label>
                                        <ReactQuill
                                            theme="snow"
                                            value={project.description}
                                            onChange={handleDescriptionChange}
                                        />
                                    </fieldset>
                                    <fieldset className="collection">
                                        <label>Category</label>
                                        <div className="category-selection">
                                            <select
                                                value={project?.category || ""}
                                                onChange={e => setProject({ ...project, category: e.target.value })}
                                                className="category-select"
                                            >
                                                <option value="" disabled>Select Category</option>
                                                <option value="Roleplay">Roleplay</option>
                                                <option value="Racing">Racing</option>
                                                <option value="Simulator">Simulator</option>
                                                <option value="Obby">Obby</option>
                                                <option value="Action">Action</option>
                                                <option value="RPG">RPG</option>
                                                <option value="Survival">Survival</option>
                                                <option value="Adventure">Adventure</option>
                                                <option value="Shooter/FPS">Shooter/FPS</option>
                                                <option value="Fantasy">Fantasy</option>
                                            </select>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <label>Goal</label>
                                        <input
                                            type="number"
                                            id="campaign-goal"
                                            name="campaign-goal"
                                            value={project?.goal}
                                            onChange={e => setProject({ ...project, goal: e.target.value })}
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <label htmlFor="launch-date">Target Launch Date (Optional)</label>
                                        <input
                                            type="date"
                                            id="launch-date"
                                            name="launch-date"
                                            onChange={e => setProject({ ...project, launchDate: e.target.value })}
                                            className="launch-date-input"
                                            value={project?.launchDate}
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <label>Campaign Duration</label>
                                        <input
                                            type="number"
                                            id="campaign-duration"
                                            name="campaign-duration"
                                            value={project?.duration}
                                            onChange={e => setProject({ ...project, duration: e.target.value })}
                                        />
                                    </fieldset>

                                    <div className="btn-submit flex gap30 justify-center">
                                        <button
                                            className="tf-button style-1 h50 w320 active"
                                            onClick={e => {
                                                e.preventDefault();
                                                setActiveIndex(1);
                                            }}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            className="tf-button style-1 h50 w320 active"
                                            onClick={e => {
                                                e.preventDefault();
                                                setActiveIndex(2);
                                            }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className={activeIndex === 2 ? "widget-content-inner assets active" : "widget-content-inner assets"} style={{ display: `${activeIndex == 2 ? "" : "none"}` }}>
                            <div className="wrap-content force-w-full">
                                <MediaUploader mediaItems={mediaItems} setMediaItems={setMediaItems} />

                                <div className="btn-submit flex gap30 justify-center force-w-full">
                                    <button
                                        className="tf-button style-1 h50 w320 active"
                                        onClick={e => {
                                            e.preventDefault();
                                            setActiveIndex(1);
                                        }}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        className="tf-button style-1 h50 w320 active"
                                        onClick={e => {
                                            e.preventDefault();
                                            setActiveIndex(3);
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className={activeIndex === 3 ? "widget-content-inner assets active" : "widget-content-inner assets"}
                            style={{ display: `${activeIndex == 3 ? "" : "none"}` }}
                        >
                            <div className="wrap-content force-w-full">
                                <button
                                    className="tf-button mb-5 active force-w-full"
                                    onClick={openModal}
                                >
                                    New Reward
                                </button>
                                {
                                    rewards?.length ?
                                        rewards.map((reward, index) => {
                                            return (
                                                <div className="flex gap30 mt-4 mb-4 reward-card" key={`reward-${index}`}>
                                                    {reward?.previewUrl && (
                                                        <div>
                                                            {reward.imageFile.type.startsWith('image/') ? (
                                                                <img src={reward?.previewUrl} alt="File Preview" />
                                                            ) : (
                                                                <video controls >
                                                                    <source src={reward?.previewUrl} type={reward.imageFile.type} />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="flex-col flex p20">
                                                        <div className="flex align-center">
                                                            <h3>{reward?.title}</h3>
                                                            <h5>(${reward?.amount})</h5>
                                                        </div>
                                                        <span className="mt-4 basic-text">
                                                            {reward?.description}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        }) : ''
                                }
                                <div className="btn-submit flex gap30 justify-center mt-10">
                                    <button
                                        className="tf-button style-1 h50 w320 active"
                                        onClick={e => {
                                            e.preventDefault();
                                            setActiveIndex(2);
                                        }}
                                    >
                                        Prev
                                    </button>

                                    <button
                                        className="tf-button style-1 h50 w320 active"
                                        onClick={e => {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>

                            {isModalOpen && (
                                <RewardModal
                                    closeModal={closeModal}
                                    setRewards={setRewards}
                                    rewards={rewards}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

function MediaUploader({ mediaItems, setMediaItems }) {
    const addMediaItem = () => {
        setMediaItems([
            ...mediaItems,
            { file: null, description: '', preview: '', type: 'image' }
        ]);
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];

        if (file) {
            const preview = URL.createObjectURL(file);
            const type = file.type.startsWith('image/') ? 'image' : 'video';
            const updatedMediaItems = mediaItems.map((item, idx) =>
                idx === index ? { ...item, file, preview, type } : item
            );
            setMediaItems(updatedMediaItems);
        }
    };

    const handleDescriptionChange = (value, index) => {
        const updatedMediaItems = mediaItems.map((item, idx) =>
            idx === index ? { ...item, description: value } : item
        );
        setMediaItems(updatedMediaItems);
    };

    return (
        <div className="media-uploader">
            {mediaItems.map((item, index) => (
                <div key={index} className="media-item wrap-upload force-w-full">
                    <form id="commentform" className="comment-form" noValidate="novalidate">
                        <fieldset className="upload">
                            <button
                                className="tf-button h50 active force-w-full"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(`file-input-${index}`).click();
                                }}
                            >
                                <img
                                    src="/assets/images/action-item/upload.png"
                                    alt="Upload"
                                    style={{ cursor: 'pointer', width: '40px' }}
                                />
                                Upload
                            </button>
                            <input
                                id={`file-input-${index}`}
                                type="file"
                                accept="image/*,video/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e, index)}
                            />
                        </fieldset>
                        {item.preview && (
                            <>
                                {item.type === 'image' ? (
                                    <img src={item.preview} alt={`preview-${index}`} width="30%" />
                                ) : (
                                    <video controls width="500">
                                        <source src={item.preview} type={item.file.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </>
                        )}
                        <fieldset className="media-description">
                            <label>Description *</label>

                            <ReactQuill
                                theme="snow"
                                value={item.description}
                                onChange={(value) => handleDescriptionChange(value, index)}
                            />
                        </fieldset>
                    </form>
                </div>
            ))}
            <button className="tf-button mb-5 force-w-full active" onClick={addMediaItem}>New Media</button>
        </div>
    );
}

function RewardModal({ closeModal, rewards, setRewards }) {
    const [reward, setReward] = useState({});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setReward(prevState => ({ ...prevState, imageFile: file, previewUrl: fileUrl }));
        }
    };

    const handleSaveReward = () => {
        setRewards([...rewards, reward]);
        closeModal();
    }

    return (
        <div className="reward-modal">
            <div className="modal-content">
                <h2 className="flex justify-center mb-5 mt-3">Add Reward</h2>
                <form>
                    <fieldset>
                        <button
                            className="tf-button h50 active force-w-full"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(`file-input-reward`).click();
                            }}
                        >
                            <img
                                src="/assets/images/action-item/upload.png"
                                alt="Upload"
                                style={{ cursor: 'pointer', width: '40px' }}
                            />
                            Upload
                        </button>
                        <input
                            id={`file-input-reward`}
                            type="file"
                            accept="image/*,video/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileChange(e)}
                        />
                    </fieldset>
                    {reward?.previewUrl && (
                        <div className="file-preview">
                            {reward.imageFile.type.startsWith('image/') ? (
                                <img src={reward?.previewUrl} alt="File Preview" />
                            ) : (
                                <video controls>
                                    <source src={reward?.previewUrl} type={reward.imageFile.type} />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}
                    <fieldset>
                        <label>
                            Title:
                        </label>
                        <input type="text" required onChange={e => setReward({ ...reward, title: e.target.value })} />
                    </fieldset>
                    <fieldset>
                        <label>
                            Description:
                        </label>
                        <textarea required onChange={e => setReward({ ...reward, description: e.target.value })}></textarea>

                    </fieldset>
                    <fieldset>
                        <label>
                            Pledge Amount:
                        </label>
                        <input type="number" required min="0" step="1" onChange={e => setReward({ ...reward, amount: e.target.value })} />
                    </fieldset>
                    <div className="flex gap30">
                        <button className="tf-button h50 active w-full" onClick={handleSaveReward}>Save</button>
                        <button className="tf-button h50 active w-full" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

