import * as React from 'react';
import { useInternetIdentity } from '../context/internet-identity';

export default function HostDashboard() {
  const { authenticate, signout, isAuthenticated, identity } = useInternetIdentity();

  return (
    <>
      <h2>Host Dashboard</h2>

      {isAuthenticated ?
                <div>Authenticated Principal: { identity?.getPrincipal().toString() || "???" }</div>
                :
                <div>Anonymous User</div>
            }
    </>
  );
}