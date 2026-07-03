import XLSX from "xlsx";

export const parseExcel = (filePath) => {

    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames.find(sheet =>
        sheet.toLowerCase().includes("hr")
    );

    if (!sheetName) {
        throw new Error("HR Contacts sheet not found.");
    }

    const worksheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(worksheet);

    const seenEmails = new Set();

    const contacts = rows
        .filter(row => {

            // Ignore rows without email
            if (!row.Email) return false;

            // Ignore invalid emails
            if (!String(row.Email).includes("@")) return false;

            return true;

        })
        .map((row, index) => ({

            id: index + 1,

            name: row.Name?.trim() || "",

            title: row.Title?.trim() || "",

            company: row.Company?.trim() || "",

            category: row.Category?.trim() || "",

            email: row.Email.trim().toLowerCase()

        }))
        .filter(contact => {

            if (seenEmails.has(contact.email))
                return false;

            seenEmails.add(contact.email);

            return true;

        });

    return contacts;

};