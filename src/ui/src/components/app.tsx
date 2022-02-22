import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function App() {
  const {
    getServerTime: getTime,
    getData,
    setData,
    identity,
    serverTime,
    data,
  } = useStore((state) => ({
    getServerTime: state.getServerTime,
    getData: state.getData,
    setData: state.setData,
    identity: state.identity,
    serverTime: state.serverTime,
    data: state.data,
  }));

  useEffect(() => {
    const init = async () => {
      // anonymous
      console.log("calling getTime");
      let dt = await getTime();

      // authenticated
      if (identity) {
        const now = Date.now().toString();
        await setData(now);
        console.log("setData", now);

        await getData();
        console.log("getData", data);
      }
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
          <Outlet />
        </main>
        <nav className="layout-nav">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/host">Host</Link>
            </li>
            <li>
              <Link to="/participant">Participant</Link>
            </li>
          </ul>
        </nav>
        {/* <aside className="layout-aside"></aside> */}
      </div>
      <footer>
        <div style={{ textAlign: "center" }}>Server Time: {serverTime}</div>
      </footer>
    </>
  );
}
