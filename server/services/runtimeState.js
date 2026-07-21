let runtimeState = {

    currentContact: null,

    logs: [],

    waitTime: 0,

    nextSendAt: null

};

export const getRuntimeState = () => runtimeState;


export const updateRuntimeState = (data) => {
    runtimeState = {
        ...runtimeState,
        ...data
    };
};

export const resetRuntimeState = () => {

    runtimeState = {

        currentContact: null,

        logs: [],

        waitTime: 0,

        nextSendAt: null

    };

};

export const addLog = (type, message) => {

    runtimeState.logs.unshift({

        id: Date.now(),

        type,

        message,

        time: new Date().toLocaleTimeString()

    });

};