import Layout from "@/components/layout/Layout"

import Action1 from "@/components/sections/Action1"
import Community from "@/components/sections/Community"
import CreateSell1 from "@/components/sections/CreateSell1"
import DiscoverProject from "@/components/sections/DiscoverProject"
import FeaturedItem1 from "@/components/sections/FeaturedItem1"
import FlatTitle1 from "@/components/sections/FlatTitle1"
import TopCollections1 from "@/components/sections/TopCollections1"
import TopCollector1 from "@/components/sections/TopCollector1"
import TopCreators from "@/components/sections/TopCreators"
import TopProjects from "@/components/sections/TopProjects"
import axios from "axios"
import { useEffect, useState } from "react"

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_API}/users/top_creators`)
            .then(res => {
                setTopUsers(res.data);
            })

    }, []);

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} pageCls="home-1">
                <FlatTitle1 />
                {/* <FeaturedItem1 /> */}
                <TopCreators topUsers={topUsers} />
                {/* <DiscoverProject /> */}
                {/* <TopCollector1 /> */}
                <TopProjects />
                {/* <CreateSell1 /> */}
                {/* <Action1 /> */}
                <Community />
            </Layout>
        </>
    )
}