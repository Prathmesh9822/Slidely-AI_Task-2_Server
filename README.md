# Slidely-AI_Task-2_Server
SlidelyAI Task-2 creating a windows from in visual studio and this is it's backend server used to store and view records from it such as name, email, phone num, git link, etc.

Certainly! Here's a consolidated `README.md` file for your project:

```markdown
# Submission Server

This is a simple submission server built with Express and TypeScript. It allows users to submit form data, view submissions, and ping the server to check if it's running.

## Features

- **Ping Endpoint**: Check if the server is running.
- **Submit Endpoint**: Submit a new form entry.
- **Read Endpoint**: Read a form submission by index.

## Requirements

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation
```

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/submission-server.git
   cd submission-server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Project**:
   ```bash
   npx tsc
   ```

## Usage

1. **Start the Server**:
   ```bash
   node dist/index.js
   ```

2. **Endpoints**:

   - **Ping the Server**:
     - **Method**: GET
     - **URL**: `http://localhost:3000/ping`
     - **Response**: `true`

   - **Submit a New Form Entry**:
     - **Method**: POST
     - **URL**: `http://localhost:3000/submit`
     - **Body** (JSON):
       ```json
       {
         "name": "John Doe",
         "email": "john.doe@example.com",
         "phone": "123-456-7890",
         "github_link": "https://github.com/johndoe",
         "stopwatch_time": 120
       }
       ```
     - **Response**: `Submission saved!`

   - **Read a Submission by Index**:
     - **Method**: GET
     - **URL**: `http://localhost:3000/read?index=0`
     - **Response**: 
       ```json
       {
         "name": "John Doe",
         "email": "john.doe@example.com",
         "phone": "123-456-7890",
         "github_link": "https://github.com/johndoe",
         "stopwatch_time": 120
       }
       ```

## File Structure

```
submission-server/
├── db.json
├── node_modules/
├── package.json
├── package-lock.json
├── src/
│   └── index.ts
└── tsconfig.json
```

## Development

To modify and develop this project further, make sure to follow the steps below:

1. **Watch for Changes**:
   ```bash
   npx tsc --watch
   ```

2. **Start the Server** (in a new terminal window):
   ```bash
   node dist/index.js
   ```


