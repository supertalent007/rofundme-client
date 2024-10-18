import Head from 'next/head'

const PageHead = ({ headTitle }) => {
    return (
        <>
            <Head>
                <title>
                    {headTitle ? headTitle : "RoFundMe | Crowd Funding Platform for Roblox Games."}
                </title>
            </Head>
        </>
    )
}

export default PageHead