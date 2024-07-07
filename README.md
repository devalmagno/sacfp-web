### Timesheet Management and Creation System

SGCFP, or "Timesheet Management and Creation System" is a comprehensive system developed to streamline the creation and management of attendance records. Created for the Universidade Estadual de Montes Claros, SGCFP automates the generation of '.docx' files, adhering to the university's attendance standards. This system encompasses a robust database housing detailed information on professors, ensuring efficient and precise management. Its implementation has notably enhanced the ease, speed, and accuracy of daily departmental tasks, providing a valuable tool for academic administration.

**Context:**  
The department was responsible for recording teacher attendance using manual timesheets, a process that was time-consuming and prone to errors due to the large number of subjects.

**Problem:**  
Manually creating timesheets for various subjects, each requiring at least 54 signature fields, was a laborious process, taking up to five days and being susceptible to errors.

**Solution:**  
I led the development of an application that stores and relates information about teachers, subjects, and class schedules, automatically generating the timesheets.

**Result:**  
The timesheet creation process was accelerated by over 80%, reducing the time from five days to one, and significantly decreasing errors thanks to the automatic data verification.

# Timesheet Automation Project

This project automates the creation of timesheets for recording teacher attendance using React for the front-end and Firebase for authentication and database management.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
- Firebase account. You can create one at [firebase.google.com](https://firebase.google.com/).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devalmagno/sacfp-web
   cd sacfp-web

2. Install dependencies:
   npm install

## Configuration

1. Create a Firebase project and configure authentication and Firestore.

2. Copy the Firebase configuration from your Firebase project settings.

3. Create a .env file in the root of your project and add the Firebase configuration:
   ```.env
    VITE_API_KEY=your-api-key
    VITE_AUTH_DOMAIN=your-auth-domain
    VITE_PROJECT_ID=your-project-id
    VITE_STORAGE_BUCKET=your-storage-bucket
    VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_APP_ID=your-app-id
   ```


Sure, here is the code in markdown format:

markdown
Copiar código
# Timesheet Automation Project

This project automates the creation of timesheets for recording teacher attendance using React for the front-end and Firebase for authentication and database management.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).
- Firebase account. You can create one at [firebase.google.com](https://firebase.google.com/).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/timesheet-automation.git
   cd timesheet-automation
Install dependencies:
bash
Copiar código
npm install
Configuration
Create a Firebase project and configure authentication and Firestore.

Copy the Firebase configuration from your Firebase project settings.

Create a .env file in the root of your project and add the Firebase configuration:

## Usage

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to http://localhost:5172.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
