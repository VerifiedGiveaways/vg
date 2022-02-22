import * as React from "react";
import { useStore } from "../store/useStore";

export default function HostDashboard() {
  const identity = useStore((state) => state.identity);

  return (
    <>
      <h2>Host Dashboard</h2>

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
