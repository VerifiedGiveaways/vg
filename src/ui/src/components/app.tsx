import * as React from 'react';
import { useState, useEffect } from 'react';
import * as Api from '../api';

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
        <>
        <header>
            <h1>Verified Giveaways</h1>
        </header>
        <div className="layout-center">
            <main className="layout-main">
                <div>
                    {dateTime}
                </div>
            </main>
            {/* <nav className="layout-nav"></nav> */}
            {/* <aside className="layout-aside"></aside> */}
        </div>
        {/* <footer></footer> */}
        </>
    );
};