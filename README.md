![Banner](https://i.imgur.com/q2uTmfW.png)

<h1 align="center">CS2Rankings</h1>

<p align="center">React website with live Counter-Strike 2 leaderboard rankings.</br>Includes overall position tracking, detailed player histories and history of previous seasons.</p>

## Live Site

Check out the live version of the website:
[CS2Rankings.com](https://cs2rankings.com/)

![Screeshots](https://i.imgur.com/0F0tpwL.png)

## Features

- Live leaderboard rankings
- Overall position tracking
- Detailed player histories
- History of previous seasons
- Region and season selection
- Player search
- Dark mode
- Lightweight mode
- Responsive design

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Redux, Recharts
- **Backend**: Node.js, Express, MongoDB, Protobuf.js

## Setup and Installation

### Backend

The backend for this project can be found in a separate repository. Follow the setup and installation instructions there to get the backend up and running.

[CS2Rankings Backend](https://github.com/Wilzzu/CS2Rankings-backend)

### Frontend

1. **Clone the repository:**

   ```
   git clone https://github.com/Wilzzu/CS2Rankings.git
   cd CS2Rankings
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Configure environment variables:**

   Rename the `.env.example` file to `.env` and fill in the variables:

   | Variable           | Description                                                                                    |
   | ------------------ | ---------------------------------------------------------------------------------------------- |
   | `VITE_APILOCATION` | The URL where your backend server is hosted, e.g., http://localhost:3000/api                   |
   | `VITE_CRYPTO`      | Random string used for decrypting API responses. Should be same for both frontend and backend. |

4. **Start the development server:**
   ```
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
