import { app } from '../../../.dfx/local/canisters/app';
import { epochTimeToShortDate, epochTimeToShortTime } from './utils';

export async function setData(data: string) : Promise<void> {
    await app.setData(data);    
};

export async function getData() : Promise<string> {
    const result = await app.getData();
    return result;
};

export async function getTime() : Promise<string> {
    const result = await app.getTime();
    return epochTimeToShortDate(result) + " " + epochTimeToShortTime(result);
};