import * as React from 'react';
import { useState, useEffect } from 'react';
import * as Api from '../api';
import { Outlet, Link } from "react-router-dom";
import { InternetIdentityProvider } from '@identity-labs/react-ic-ii-auth';

export default function App () {
    const [dateTime, setDateTime] = useState<string>("");

    useEffect(() => {
        const init = async () => {
            let dt = await Api.getDateTime();
            setDateTime(dt);
        };
        init();
       
    }, []);

    return (           
        <InternetIdentityProvider
            authClientOptions={{
                onSuccess: (identity) => console.log(
                    "Successful Login", {identity}
                ),
                identityProvider: `${process.env.II_PROVIDER_URL}`
            }}
        >
            <header>
                <h1>Verified Giveaways</h1>
            </header>
            <div className="layout-center">
                <main className="layout-main">
                    <Outlet/>
                </main>
                <nav className="layout-nav">
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/welcome">Welcome</Link></li>
                        <li><Link to="/host">Host</Link></li>
                        <li><Link to="/participant">Participant</Link></li>
                    </ul>
                </nav>
                {/* <aside className="layout-aside"></aside> */}
            </div>
            <footer>
                <div style={{textAlign: "center"}}>{dateTime}</div>
            </footer>
        </InternetIdentityProvider>
    );
};