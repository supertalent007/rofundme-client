import Preloader from "@/components/elements/Preloader"
import { useEffect, useState } from "react"
// import 'swiper/css';
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import 'swiper/css/free-mode';
import AddClassBody from "@/components/elements/AddClassBody"
import "/public/assets/css/style.css"
import "/public/assets/css/responsive.css"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./checkout"

function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = useState(true)
    const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
    const initialOptions = { "client-id": PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)

    }, [])
    return (
        <Elements stripe={stripePromise}>
            <PayPalScriptProvider options={initialOptions}>
                {/* <Checkout /> */}
                {!loading ? (
                    <>
                        <AddClassBody />
                        <Component {...pageProps} />
                    </>
                ) : (
                    <Preloader />
                )}
            </PayPalScriptProvider>
        </Elements>
    )
}

export default MyApp
