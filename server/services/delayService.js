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

    console.log(`Waiting ${delay / 1000}s`);

    await sleep(delay);

};