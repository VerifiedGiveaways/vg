import * as React from 'react';
import { useState, useEffect } from 'react';
import * as Api from '../api';
import { Outlet, Link } from 'react-router-dom';
import { InternetIdentityProvider } from '../context/internet-identity';

export default function App () {
    const [dateTime, setDateTime] = useState<string>("");

    const getTime = async() => {
        console.log('getTime');
        let dt = await Api.getTime();
        setDateTime(dt);    
    };

    const setData = async() => {
        console.log('setData');
        await Api.setData("browser date: " + Date.now());
    };

    const getData = async () => {
        console.log('getData');
        const data = await Api.getData();
        console.log(data);
    };

    useEffect(() => {

        const init = async() => {
            await getTime();
            await setData();
            await getData();
        };
        init();
       
    }, []);

    return (           
        <InternetIdentityProvider
            authClientOptions={{
                onSuccess: (identity) => console.log(
                    "Successful Login", {identity}
                ),
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