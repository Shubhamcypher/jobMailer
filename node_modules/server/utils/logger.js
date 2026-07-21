import fs from "fs";

export const writeLog = (file, data) => {

    let logs = [];

    if (fs.existsSync(file)) {

        logs = JSON.parse(
            fs.readFileSync(file)
        );

    }

    logs.push(data);

    fs.writeFileSync(
        file,
        JSON.stringify(logs, null, 2)
    );

};