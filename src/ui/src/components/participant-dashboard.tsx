import * as React from 'react';
import { useInternetIdentity } from '../context/internet-identity';

export default function ParticipantDashboard() {
  const { isAuthenticated, identity } = useInternetIdentity();

  return (
    <>
      <h2>Participant Dashboard</h2>

      {isAuthenticated ?
                <div>Authenticated Principal: { identity?.getPrincipal().toString() || "???" }</div>
                :
                <div>Anonymous User</div>
            }
    </>
  );
}