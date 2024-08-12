# Banner Timer Project

## Overview

This project includes a banner timer feature that displays a countdown timer on a banner. The timer is retrieved from a backend API and displayed in the format of days, hours, minutes, and seconds. The backend is built using Node.js and MySQL, and the frontend is built using React.

## Features

- **Countdown Timer:** Displays the remaining time in days, hours, minutes, and seconds.
- **Banner Management:** Allows fetching and updating banner details including title, description, timer settings, and visibility.
- **API Endpoints:** Provides endpoints for banner data retrieval and updates.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL
- **API:** Axios for HTTP requests
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- MySQL
- Any MySQL database service 

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. **Install Dependencies:**
    ```bash
    npm install

3. **Configure Environment Variables:**

  Create a .env file in the root directory of the backend project and add the following configuration:
  ```bash
      PORT // port number
      DB_HOST // database hostname, in my case i am using localhost
      DB_USER // your mysql username
      DB_PASSWORD // your mysql password
      DB_DATABASE // your database name
  ```

4. **Start the Backend Server:**
  ```bash
    cd backend
    npm install
    node index.js
    The server will run on http://localhost:3001.
  ```

5. **Frontend Setup:**
Clone the Repository:

```bash

  git clone <repository-url>
  cd frontend
  npm install
  npm start

  The frontend will be available at http://localhost:3000.
```
6. **API Endpoints:**
   ```bash
    GET /api/banner: Fetches banner details including the timer.
    POST /api/banner/toggle: Updates the visibility of the banner.
    POST /api/banner/update: Updates the banner details including timer and start time.
    ```
   
7. **How It Works:**
   ```bash
    Banner Timer: The backend stores the banner's start time and duration in seconds. The frontend fetches this data and calculates the remaining time.
    Display Format: The remaining time is displayed in days, hours, minutes, and seconds format on the banner.
    Banner Management: Admins can update the banner's details and visibility through the provided API endpoints.
   ```
