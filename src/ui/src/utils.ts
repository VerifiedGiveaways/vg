export const epochTimeToShortDate = (epochTime: BigInt) => {
    return new Date(Number(epochTime)).toLocaleDateString();
};

export const epochTimeToShortTime = (epochTime: BigInt) => {
    return new Date(Number(epochTime)).toLocaleTimeString();
};
