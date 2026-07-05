import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

const templatePath = path.join(
    process.cwd(),
    "templates",
    "coldEmail.hbs"
);

// Read only once when the server starts
const source = fs.readFileSync(templatePath, "utf8");

// Compile only once
const template = Handlebars.compile(source);

export const renderTemplate = (contact) => {

    return template(contact);

};