# REST API Documentation

This document outlines the REST API endpoints available in the Hex Game application, detailing the required request formats and expected responses.

## Base URL

The base URL for all API requests is: `http://localhost:8000`

## Authentication

Currently, the API does not require authentication.

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200/201`: Success
- `400`: Bad request (invalid parameters)
- `404`: Resource not found
- `500`: Server error

Error responses have the following format:
```json
{
  "error": "Error message description"
}
```

## API URL Structure

All API endpoints follow a consistent URL pattern with the `/api/` prefix:
- Game-related endpoints: `/api/games/...`
- AI game-related endpoints: `/api/ai_games/...`

## Endpoints

### Games

#### Create a New Game (Human vs AI)

- **URL**: `/api/games/`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "mode": "HUMAN_AI"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": 1,
    "board": [[0, 0, ...], ...],
    "player_turn": "human",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [],
    "win_probability": {"human": 0.5, "AI": 0.5},
    "mode": "HUMAN_AI"
  }
  ```

#### Get Game Status

- **URL**: `/api/games/{game_id}/`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "id": 1,
    "board": [[0, 0, ...], ...],
    "player_turn": "human",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [
      {
        "player": "human",
        "x": 5,
        "y": 5,
        "step": 1,
        "color": "red"
      }
    ],
    "win_probability": {"human": 0.5, "AI": 0.5},
    "mode": "HUMAN_AI"
  }
  ```

#### List All Games

- **URL**: `/api/games/`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1,
      "player_turn": "human",
      "winner": null,
      "mode": "HUMAN_AI",
      "human_color": "red"
    },
    {
      "id": 2,
      "player_turn": "AI_1",
      "winner": "AI_2",
      "mode": "AI_AI",
      "human_color": "red"
    }
  ]
  ```

#### Make a Move

- **URL**: `/api/games/{game_id}/move/`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "x": 5,
    "y": 5
  }
  ```
  > Note: Coordinates are backend XY coordinates (row, column). Frontend must convert from cube coordinates.
- **Response**: `200 OK`
  ```json
  {
    "id": 1,
    "board": [[0, 0, ...], ...],
    "player_turn": "AI",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [...],
    "win_probability": {"human": 0.5, "AI": 0.5},
    "mode": "HUMAN_AI"
  }
  ```

#### Request AI Move

- **URL**: `/api/games/{game_id}/ai_move/`
- **Method**: `POST`
- **Request Body**: Empty
- **Response**: `200 OK`
  ```json
  {
    "id": 1,
    "board": [[0, 0, ...], ...],
    "player_turn": "human",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [...],
    "win_probability": {"human": 0.45, "AI": 0.55},
    "mode": "HUMAN_AI"
  }
  ```

#### Undo Last Move

- **URL**: `/api/games/{game_id}/undo/`
- **Method**: `POST`
- **Request Body**: Empty
- **Response**: `200 OK`
  ```json
  {
    "id": 1,
    "board": [[0, 0, ...], ...],
    "player_turn": "human",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [...],
    "win_probability": {"human": 0.5, "AI": 0.5},
    "mode": "HUMAN_AI"
  }
  ```

#### Restart Game

- **URL**: `/api/games/{game_id}/restart/`
- **Method**: `POST`
- **Request Body**: Empty
- **Response**: `200 OK`
  ```json
  {
    "id": 1,
    "board": [[0, 0, ...], ...],
    "player_turn": "human",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [],
    "win_probability": {"human": 0.5, "AI": 0.5},
    "mode": "HUMAN_AI"
  }
  ```

### AI vs AI Games

#### Create a New AI vs AI Game

- **URL**: `/api/ai_games/`
- **Method**: `POST`
- **Request Body**: Empty
- **Response**: `201 Created`
  ```json
  {
    "id": 2,
    "board": [[0, 0, ...], ...],
    "player_turn": "AI_1",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [],
    "win_probability": {"AI_1": 0.5, "AI_2": 0.5},
    "mode": "AI_AI"
  }
  ```

#### Get AI Game Status

- **URL**: `/api/ai_games/{game_id}/`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "id": 2,
    "board": [[0, 0, ...], ...],
    "player_turn": "AI_2",
    "human_color": "red",
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [...],
    "win_probability": {"AI_1": 0.45, "AI_2": 0.55},
    "mode": "AI_AI"
  }
  ```

#### Request Next AI Move (AI vs AI)

- **URL**: `/api/ai_games/{game_id}/next_move/`
- **Method**: `POST`
- **Request Body**: Empty
- **Description**: Triggers the backend to make the next single AI move in an ongoing AI vs AI game. The backend runs the move in a background thread and returns the updated game state shortly after.
- **Response**: `200 OK`
  ```json
  {
    "id": 2,
    "board": [[0, 0, ...], ...],
    "player_turn": "AI_1", // Or "AI_2", depending on who moved
    "human_color": "red", // Note: human_color may not be meaningful in AI_AI
    "last_moves": [[0, 0, ...], ...],
    "winner": null,
    "moves_history": [...], // Includes the newly made move
    "win_probability": {"AI_1": 0.52, "AI_2": 0.48},
    "mode": "AI_AI"
  }
  ```

## Data Structures

### Board Representation

The backend represents the board as a 2D array of size 11x11 with the following values:
- `0`: Empty cell
- `1`: Red piece (Player 1)
- `-1`: Blue piece (Player 2)

Example:
```json
[
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
```

### Move History

The move history is an array of objects, each representing a move:

```json
{
  "player": "human", // "human", "AI", "AI_1", or "AI_2"
  "x": 5, // Row index
  "y": 5, // Column index
  "step": 1, // Move number
  "color": "red" // "red" or "blue"
}
```

### Coordinate System

**Important**: The frontend and backend use different coordinate systems:

1. **Backend**: Uses XY coordinates (row, column)
   - `x`: Row index (0-10)
   - `y`: Column index (0-10)

2. **Frontend**: Uses Cube Coordinates `{q, r, s}` where `q + r + s = 0`
   - When sending moves to the backend, the frontend must convert cube coordinates to XY coordinates using:
     ```typescript
     const { x, y } = cubeToXY(cubeCoordinates);
     ```
   - When receiving game state from the backend, the frontend must convert XY to cube coordinates:
     ```typescript
     const cubeCoords = xyToCube(x, y);
     ```

## Note About API Path Consistency

All API endpoints now consistently use the `/api/` prefix. This standardization improves compatibility between frontend and backend, reduces errors, and simplifies maintenance. Always include the `api/` prefix in all your API calls. 