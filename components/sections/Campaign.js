export default function Campaign({ project, HtmlRenderer }) {
    const MEDIA_URL = process.env.NEXT_PUBLIC_SERVER_URL;

    return (
        <>
            <div className="tf-section action">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            {
                                project?.thumbs?.length &&
                                project.thumbs.map((thumb, index) => {
                                    return (
                                        <div className="sub-campaign justify-center flex flex-col align-center" key={`camp-${index}`}>
                                            {
                                                thumb?.type === 'image' ?
                                                    <img src={`${MEDIA_URL}/${thumb?.filePath}`} alt="media" width='80%' /> :
                                                    <video controls width="500">
                                                        <source src={`${MEDIA_URL}/${thumb?.filePath}`} type="video/mp4" />
                                                    </video>
                                            }

                                            <HtmlRenderer htmlContent={thumb?.description} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
