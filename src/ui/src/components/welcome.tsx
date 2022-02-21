import * as React from 'react';
import { useInternetIdentity } from '../context/internet-identity';

export default function Welcome() {
    const { isAuthenticated, identity } = useInternetIdentity();
    
    return (
        <>
            <h2>Welcome</h2>

            {isAuthenticated ?
                <div>Authenticated Principal: { identity?.getPrincipal().toString() || "???" }</div>
                :
                <div>Anonymous User</div>
            }
        </>
    );
};