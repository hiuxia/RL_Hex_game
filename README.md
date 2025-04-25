# Hex Game with Reinforcement Learning AI

A modern implementation of the classic Hex board game with an intelligent AI opponent powered by reinforcement learning techniques.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Description

Hex is a two-player connection board game played on a grid of hexagons where players take turns placing stones of their color. The goal is to create a continuous path connecting opposite sides of the board. This implementation features a web-based interface with a reinforcement learning AI opponent that utilizes Monte Carlo Tree Search (MCTS) and neural networks to play at a high level.

The project consists of a Django backend for game logic and AI integration, coupled with a modern React frontend for the user interface. The two components communicate primarily via WebSockets for real-time game updates.

## Features

- Interactive hexagonal game board with intuitive mouse controls
- Multiple game modes:
  - Human vs AI mode with reinforcement learning opponent
  - AI vs AI simulation mode
- Real-time game state updates via WebSocket
- Game history tracking and replay functionality
- Undo and restart game options
- Win probability estimates from the AI
- Responsive design for various screen sizes

## Technology Stack

### Frontend
- Next.js (React, TypeScript) with App Router
- Tailwind CSS for styling
- Zustand for state management
- WebSocket API for real-time communication

### Backend
- Django (Python) web framework
- ASGI with Django Channels for WebSocket support
- Django REST Framework for auxiliary API endpoints
- SQLite for data persistence

### Reinforcement Learning
- PyTorch for neural network training and inference
- Custom MCTS (Monte Carlo Tree Search) implementation
- Reinforcement learning algorithms for training the AI

## Installation

### Prerequisites
- Node.js (v18+)
- Python 3.8+
- pip (Python package manager)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Set up a Python virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install backend dependencies:
   ```bash
   cd backend/RL_Hex_game
   pip install -r requirements.txt  # If requirements.txt exists, otherwise install Django, channels, and other dependencies manually
   ```

4. Apply migrations:
   ```bash
   cd Hex
   python manage.py migrate
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../../hex-ai-frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Usage

### Running the Development Servers

1. Start the Django backend server with ASGI support:
   ```bash
   # From project root
   ./run_django_server.sh
   
   # Or manually:
   cd backend/RL_Hex_game/Hex
   daphne Hex.asgi:application
   ```

2. Start the Next.js development server:
   ```bash
   # From project root
   ./run_npm_server.sh
   
   # Or manually:
   cd hex-ai-frontend
   npm run dev
   ```

3. Access the application:
   - The frontend will be available at: http://localhost:3000
   - The backend API will be available at: http://localhost:8000

### Playing the Game

1. Navigate to the game page to start a new game
2. Choose a game mode (Human vs AI or AI vs AI)
3. For Human vs AI:
   - Click on any hexagon to place your stone
   - The AI will automatically respond with its move
4. Use the controls to:
   - Undo moves
   - Restart the game
   - View win probabilities

## Configuration

### Backend Configuration

Key configuration files:
- `backend/RL_Hex_game/Hex/Hex/settings.py`: Django settings
- `backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py`: AI configuration

### Frontend Configuration

Key configuration files:
- `hex-ai-frontend/src/lib/constants.ts`: Board size and constants
- `hex-ai-frontend/src/lib/coordinates.ts`: Coordinate system conversion

## API Documentation

The application uses two communication methods:

### WebSocket API (Primary)

Used for real-time game actions and updates.

- **Connection Endpoints**:
  - New Game: `/ws/game/new/`
  - Active Game: `/ws/game/{gameId}/`

- **Client Messages**:
  ```json
  {
    "action": "<action_name>",
    // Action-specific data
  }
  ```

- **Server Responses**:
  ```json
  {
    "type": "<message_type>",
    "data": {
      // State or error details
    }
  }
  ```

- **Key Actions**:
  - `create_game`: Create a new game
  - `move`: Make a move
  - `ai_move`: Request AI move
  - `undo`: Undo last move
  - `restart`: Restart game

### REST API (Secondary)

Used for non-real-time operations.

- **Base URL**: `http://localhost:8000/api/`
- **Key Endpoints**:
  - `GET /api/games/`: List all games
  - `POST /api/games/`: Create a new game
  - `GET /api/games/{id}/`: Get game status
  - `POST /api/ai_games/`: Create AI vs AI game

For detailed API documentation, see [API Documentation](./docs/API_DOCUMENTATION.md).

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
