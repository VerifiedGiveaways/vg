import * as React from "react";
import { useStore } from "../store/useStore";

const Login = () => {
  const identity = useStore((state) => state.identity);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  return (
    <>
      <h2>Log In/Out</h2>
      <div>
        <button onClick={identity ? logout : login}>
          {identity ? "Logout" : "Login with Internet Identity"}
        </button>
      </div>

      <br />

      {identity ? (
        <div>
          Authenticated Principal:{" "}
          {identity?.getPrincipal().toString() || "???"}
        </div>
      ) : (
        <div>Anonymous User</div>
      )}
    </>
  );
};

export default Login;
