import { app } from '../../../.dfx/local/canisters/app';
import { epochTimeToShortDate, epochTimeToShortTime } from './utils';

export async function getDateTime() : Promise<string> {
    const result = await app.getTime();
    return epochTimeToShortDate(result) + " " + epochTimeToShortTime(result);
};