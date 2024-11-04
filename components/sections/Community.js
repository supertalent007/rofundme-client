import Link from "next/link"

export default function Community() {
    return (
        <>
            <div className="tf-section top-collections">
                <div className="themesflat-container flex justify-center">
                    <div className="col-md-12 flex p-5 align-center row" style={{ boxShadow: ' 0px 0px 8px 8px rgba(255, 255, 255, 0.1)' }}>
                        <div className="flex flex-col col-md-6">
                            <p className="tf-title mb-2">Get the latest updates and more.</p>
                            <h2>Join our community today!</h2>
                            <div className="flex mt-5 gap20 mb-5">
                                <button className="flex justify-center pr-5 pl-5 height-auto bg-blue"><Link href="#" className="icon-vt font-size-30" /></button>
                                <button className="flex justify-center pr-5 pl-5 height-auto bg-light-blue"><Link href="#" className="icon-twitter font-size-30" /></button>
                                <button className="flex justify-center pr-5 pl-5 height-auto bg-red"><Link href="#" className="icon-facebook font-size-30" /></button>
                            </div>
                        </div>
                        <div className="flex flex-col col-md-6">
                            <img src="/assets/images/Robloxian_3D_Png.webp" style={{ width: '250px', marginRight: 0, marginLeft: 'auto' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
