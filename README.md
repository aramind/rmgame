# RM Game (a tic-tac-toe game)

This is a full-stack Tic Tac Toe inspired game built using the **MERN stack** — MongoDB, Express, React, and Node.js — along with modern web technologies like HTML, CSS, JavaScript, and Material UI for the frontend design.

## 🎮 Live Demo

👉 [Play the game here](https://rmgame-htth.onrender.com)


## Tech Stack

- **Frontend:**  
  HTML, CSS, JavaScript, React, Material UI  
- **Backend:**  
  Node.js, Express  
- **Database:**  
  MongoDB, Mongoose (ODM)

## 🧩 Use Cases

### ✅ Required Features

#### 1. User Registration and Gameplay
- Players must be able to input their name while playing.

#### 2. Starting a Game Session
- Home Page displays a list of all previous game sessions.
- "Start New Game" button initiates a new game session.
- Players provide a display name for use during gameplay.

#### 3. Gameplay and Rounds
- Game board displays players identified by display names or usernames.
- Each round records wins, losses, and draws for both players.
- After each round:
  - Players can choose "Continue" to start a new round.
  - Players can choose "Stop" to end the session.
  - Entire game session data (rounds and results) is saved to the database.

#### 4. Game History
- Completed games are saved.

#### 5. Submission and Deployment
- Project must be built using MERN stack.
- Project is pushed to a public GitHub repository.
- Production-ready version is deployed and shared for evaluation.

---

### ✨ Optional Enhancements

#### 1. Extended User Authentication
- Players create an account with a unique username and password.
- Players must authenticate (login) before playing.
- New users without an account are prompted to register.
- Demo game mode available for visitors to try without registration.
- Progress in demo mode is not saved unless the visitor registers an account.
- Both players enter their registered usernames and passwords for verification.
- Credentials are verified before starting the game.
- If verification fails, players are prompted to retry or register.

#### 2. User Experience
- Sound effects play during game actions to enhance user experience.

#### 3. Game History and Stats
- Player statistics (wins, losses, draws) are updated and displayed.
- Users can view their game history and stats, including opponents and outcomes.

#### 4. Leaderboard
- Home Page displays a leaderboard with top players ranked by performance (e.g., number of wins).
- Leaderboard updates dynamically based on stored game data.

---

## API Documentation

### Players API

| Action                  | URL                   | HTTP Verb | CRUD   | Description                              |
|-------------------------|-----------------------|-----------|--------|------------------------------------------|
| Get All Players         | `/v1/players`      | GET       | Read   | Retrieve a list of players. Supports filtering and field selection. |
| Get Player by ID        | `/v1/players/:id`  | GET       | Read   | Retrieve a specific player by their ID. |
| Get Top Win Rate Players | `/v1/players/topwins`  | GET       | Read   | Retrieve top 10 players ranked by win ratio. |
| Increment Player Stat   | `/v1/players/:id/increment/:stat` | PATCH | Update | Increment wins, losses, or draws for a player. |

---

### Games API

| Action          | URL               | HTTP Verb | CRUD   | Description                                  |
|-----------------|-------------------|-----------|--------|----------------------------------------------|
| Add New Game    | `/v1/add`         | POST      | Create | Adds a new game record and updates player stats atomically. |
| Get Game by ID  | `/v1/games/:id`   | GET       | Read   | Retrieves a specific game by its ID with optional fields. |
| Get Games List  | `/v1/games`       | GET       | Read   | Retrieves a list of games with filtering, pagination, and field selection. |

---

### Auth API

| Action          | URL                  | HTTP Verb | CRUD   | Description                       |
|-----------------|----------------------|-----------|--------|-----------------------------------|
| Register User   | `/v1/auth/register`  | POST      | Create | Creates a new player account.     |
| Verify Users    | `/v1/auth/verify`    | POST      | Read   | Verifies credentials of two players before a game. |

---
## Important Notes
- Passwords are stored in plain text intentionally for simplicity and easier password recovery.  
- Profile images are auto-generated based on the username using DiceBear avatars.

---

**Made with 🧠 and 💻 by [@aramind](https://github.com/aramind)**
