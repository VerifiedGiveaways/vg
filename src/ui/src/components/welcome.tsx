import React, { useEffect } from "react";
import { useStore } from "../store/useStore";

export default function Welcome() {
  const identity = useStore((state) => state.identity);
  const getAppPrincipalId = useStore((state) => state.getAppPrincipalId);
  const getUserPrincipalId = useStore((state) => state.getUserPrincipalId);
  const appPrincipalId = useStore((state) => state.appPrincipalId);
  const userPrincipalId = useStore((state) => state.userPrincipalId);

  useEffect(() => {
    const init = async () => {
      await getAppPrincipalId();
      await getUserPrincipalId();
    };
    init();
  }, []);

  return (
    <>
      <h2>Welcome</h2>

      {identity ? (
        <div>
          Identity Principal:
          {identity?.getPrincipal().toString() || "???"}
          <br />
          <br />
          Principal Seen by App Canister 1: {appPrincipalId}
          <br />
          <br />
          Principal Seen by App Canister 2: {userPrincipalId}
        </div>
      ) : (
        <div>Anonymous User</div>
      )}
    </>
  );
}
