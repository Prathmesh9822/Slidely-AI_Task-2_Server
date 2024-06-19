import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Path to the JSON database
const dbPath = path.join(__dirname, '../db.json');

// Load submissions from JSON file
const loadSubmissions = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

// Save submissions to JSON file
const saveSubmissions = (submissions: any) => {
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
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
    const index = parseInt(req.query.index as string, 10);
    const submissions = loadSubmissions();
    if (index >= 0 && index < submissions.length) {
        res.send(submissions[index]);
    } else {
        res.status(404).send('Submission not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
