import fs from "fs";
import path from "path";

export const renderTemplate = (contact) => {

    const templatePath = path.join(
        process.cwd(),
        "templates",
        "coldEmail.html"
    );

    let html = fs.readFileSync(templatePath, "utf8");

    html = html.replace(/{{name}}/g, contact.name);

    html = html.replace(/{{company}}/g, contact.company);

    html = html.replace(/{{title}}/g, contact.title);

    return html;

};