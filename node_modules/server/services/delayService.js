import { updateRuntimeState } from "./runtimeState.js";

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const randomDelay = () => {

    // 30–90 seconds
    const min = Number(process.env.MIN_DELAY);
    const max = Number(process.env.MAX_DELAY);

    return Math.floor(Math.random() * (max - min + 1)) + min;

};



export const wait = async () => {

    const delay = randomDelay();

    updateRuntimeState({
        waitTime: Math.ceil(delay / 1000),
        nextSendAt: Date.now() + delay
    });

    for (let remaining = Math.ceil(delay / 1000); remaining > 0; remaining--) {

        updateRuntimeState({
            waitTime: remaining
        });

        await sleep(1000);

    }

    updateRuntimeState({
        waitTime: 0,
        nextSendAt: null
    });

};