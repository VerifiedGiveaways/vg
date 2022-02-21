import { ActorSubclass, Identity, AnonymousIdentity } from "@dfinity/agent";
import { canisterId, createActor } from '../../../.dfx/local/canisters/app';
import { _SERVICE } from "../../../.dfx/local/canisters/app/app.did";
import { epochTimeToShortDate, epochTimeToShortTime } from './utils';

// the identity must be explicity passed to the actor reference
// or the canister function's caller will be the anonymous identity
function getActor(identity?: Identity) : ActorSubclass<_SERVICE> {
    return createActor(canisterId as string, {
        agentOptions: { identity: identity || new AnonymousIdentity() }
    });
};

export async function setData(data: string, identity: Identity) : Promise<void> {
    await getActor(identity).setData(data);
};

export async function getData(identity: Identity) : Promise<string> {
    const result = await getActor(identity).getData();
    return result;
};

export async function getTime(identity?: Identity) : Promise<string> {
    const result = await getActor(identity).getTime();
    return epochTimeToShortDate(result) + " " + epochTimeToShortTime(result);
};
