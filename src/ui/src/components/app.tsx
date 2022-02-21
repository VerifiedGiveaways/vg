import * as React from 'react';
import { useState } from 'react';
import * as Api from '../api';
import { Outlet, Link } from 'react-router-dom';
import { InternetIdentityProvider } from '../context/internet-identity';
import { Identity } from '@dfinity/agent';

export default function App () {
    const [dateTime, setDateTime] = useState<string>("");

    const onLoginSuccess = async(identity: Identity) => {
        console.log("Successful Login", {identity});

        //anonymous
        console.log('calling getTime');
        let dt = await Api.getTime(identity);
        setDateTime(dt);

        console.log('identity', identity);

        //authenticated
        if (identity) {
            const data = Date.now().toString();
            await Api.setData(data, identity);
            console.log('setData', data);

            const fetchedData = await Api.getData(identity);
            console.log('getData', fetchedData);
        };
    };

    return (           
        <InternetIdentityProvider
            authClientOptions={{
                onSuccess: onLoginSuccess,
                identityProvider: `${process.env.II_PROVIDER_URL}`,
            }}
            fakeProvider={process.env.II_PROVIDER_USE_FAKE == 'true'}
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