"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
// Path to the JSON database
const dbPath = path_1.default.join(__dirname, '../db.json');
// Load submissions from JSON file
const loadSubmissions = () => {
    const data = fs_1.default.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};
// Save submissions to JSON file
const saveSubmissions = (submissions) => {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
};
// Endpoints
app.get('/ping', (req, res) => {
    res.send(true);
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // if (!name || !email || !phone || !github_link || !stopwatch_time) {
    //     return res.status(400).send('All fields are required');
    // }
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        const missingFields = [];
        if (!name)
            missingFields.push('name');
        if (!email)
            missingFields.push('email');
        if (!phone)
            missingFields.push('phone');
        if (!github_link)
            missingFields.push('github_link');
        if (!stopwatch_time)
            missingFields.push('stopwatch_time');
        return res.status(400).send(`All fields are required: ${missingFields.join(', ')}`);
    }
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    const submissions = loadSubmissions();
    submissions.push(newSubmission);
    saveSubmissions(submissions);
    res.send('Submission saved!');
});
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    const submissions = loadSubmissions();
    if (index >= 0 && index < submissions.length) {
        res.send(submissions[index]);
    }
    else {
        res.status(404).send('Submission not found');
    }
});
// Additional Features
// Delete submission by index
app.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10); // Parse index as integer
    const submissions = loadSubmissions();
    if (index >= 0 && index < submissions.length) {
        submissions.splice(index, 1); // Remove submission at specified index
        saveSubmissions(submissions);
        res.send(`Submission at index ${index} deleted successfully`);
    }
    else {
        res.status(404).send(`Submission at index ${index} not found`);
    }
});
// app.delete('/delete', (req, res) => {
//     const index = parseInt(req.query.index as string, 10);
//     const submissions = loadSubmissions();
//     if (index >= 0 && index < submissions.length) {
//         submissions.splice(index, 1);
//         saveSubmissions(submissions);
//         res.send('Submission deleted!');
//     } else {
//         res.status(404).send('Submission not found');
//     }
// });
// Update submission by index
app.put('/update', (req, res) => {
    const index = parseInt(req.query.index, 10);
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const submissions = loadSubmissions();
    if (index >= 0 && index < submissions.length) {
        const updatedSubmission = { name, email, phone, github_link, stopwatch_time };
        submissions[index] = updatedSubmission;
        saveSubmissions(submissions);
        res.send('Submission updated!');
    }
    else {
        res.status(404).send('Submission not found');
    }
});
// Search submissions by email
app.get('/search', (req, res) => {
    const email = req.query.email;
    const submissions = loadSubmissions();
    const result = submissions.filter((submission) => submission.email === email);
    if (result.length > 0) {
        res.send(result);
    }
    else {
        res.status(404).send('No submissions found for the provided email');
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//OLD CODE
// import express from 'express';
// import bodyParser from 'body-parser';
// import fs from 'fs';
// import path from 'path';
// const app = express();
// const port = 3000;
// app.use(bodyParser.json());
// // Path to the JSON database
// const dbPath = path.join(__dirname, '../db.json');
// // Load submissions from JSON file
// const loadSubmissions = () => {
//     const data = fs.readFileSync(dbPath, 'utf-8');
//     return JSON.parse(data);
// };
// // Save submissions to JSON file
// const saveSubmissions = (submissions: any) => {
//     fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
// };
// // Endpoints
// app.get('/ping', (req, res) => {
//     res.send(true);
// });
// app.post('/submit', (req, res) => {
//     const { name, email, phone, github_link, stopwatch_time } = req.body;
//     if (!name || !email || !phone || !github_link || !stopwatch_time) {
//         return res.status(400).send('All fields are required');
//     }
//     const newSubmission = { name, email, phone, github_link, stopwatch_time };
//     const submissions = loadSubmissions();
//     submissions.push(newSubmission);
//     saveSubmissions(submissions);
//     res.send('Submission saved!');
// });
// app.get('/read', (req, res) => {
//     const index = parseInt(req.query.index as string, 10);
//     const submissions = loadSubmissions();
//     if (index >= 0 && index < submissions.length) {
//         res.send(submissions[index]);
//     } else {
//         res.status(404).send('Submission not found');
//     }
// });
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
