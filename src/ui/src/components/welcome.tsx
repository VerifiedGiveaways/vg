import * as React from "react";
import { useStore } from "../store/useStore";

export default function Welcome() {
  const identity = useStore((state) => state.identity);

  return (
    <>
      <h2>Welcome</h2>

      {identity ? (
        <div>
          Authenticated Principal:
          {identity?.getPrincipal().toString() || "???"}
        </div>
      ) : (
        <div>Anonymous User</div>
      )}
    </>
  );
}
