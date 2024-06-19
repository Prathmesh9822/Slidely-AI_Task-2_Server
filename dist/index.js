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
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send('All fields are required');
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
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
