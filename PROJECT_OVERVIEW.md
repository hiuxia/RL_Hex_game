# Hex Game Project Overview

## Introduction

This project implements a web-based version of the classic Hex board game with an AI opponent powered by reinforcement learning. The game features a modern UI built with Next.js and a backend server implemented in Django. Originally designed with WebSocket connections for real-time gameplay, the project has recently migrated to a REST API architecture for all game interactions.

## Core Components

### 1. Frontend (Next.js/React/TypeScript)

- **UI Framework**: Next.js with App Router
- **State Management**: Zustand store (`gameStore.ts`)
- **Styling**: Tailwind CSS
- **Key Features**:
  - Interactive hex board with SVG rendering
  - Game creation options (Human vs AI, AI vs AI)
  - Move validation and visualization
  - Win detection and game status display (with frontend redundancy)
  - Coordinate system conversion (Cube to XY coordinates)
  - AI vs AI mode with optional automatic move progression controlled by the frontend

### 2. Backend (Django/Python)

- **Web Framework**: Django
- **Database**: SQLite (Django ORM)
- **Key Components**:
  - Hexgame models (`HexGame` model with game state)
  - REST API views (game creation, moves, status)
  - AI integration (PyTorch-based reinforcement learning)
  - Game logic (move validation, win detection)
  - Dedicated endpoint for triggering single AI moves in AI vs AI mode

### 3. Reinforcement Learning Agent

- **Framework**: PyTorch
- **Location**: Integrated within the Django backend
- **Capabilities**:
  - Board evaluation
  - Move selection using trained models
  - Win probability estimation

## Recent Architectural Changes

The project recently underwent a significant architectural change, migrating from WebSocket connections to REST API calls:

### WebSocket to REST Migration

- **Previous Architecture**: Used Django Channels for real-time WebSocket communication
- **Current Architecture**: Fully REST-based API for all game operations
- **Migration Benefits**:
  - Simplified architecture
  - Reduced complexity in deployment
  - Improved error handling
  - More consistent API structure

### API Standardization

- **URL Structure**: All API endpoints now consistently use the `/api/` prefix
- **Standardization Benefits**:
  - Reduced confusion between frontend and backend
  - Simplified routing configuration
  - Improved API path consistency
  - Better error handling for API calls

### Key API Endpoints

The REST API provides endpoints for:

1. Game creation (`/api/games/` or `/api/ai_games/`)
2. Game status retrieval (`/api/games/{game_id}/`)
3. Move submission (`/api/games/{game_id}/move/`)
4. AI move requests (`/api/games/{game_id}/ai_move/` for Human vs AI)
5. Next AI move request (`/api/ai_games/{game_id}/next_move/` for AI vs AI)
6. Game control (undo, restart) via `/api/games/{game_id}/undo/` and `/api/games/{game_id}/restart/`
7. Game listing (`/api/games/`)

## Data Structures

### Game State

The core game state includes:

- **Board**: 11x11 2D array (0 = empty, 1 = red/player1, -1 = blue/player2)
- **Player Turn**: Indicates whose turn it is ("human", "AI", "AI_1", "AI_2")
- **Move History**: Sequence of moves with player, coordinates, and color
- **Game Mode**: "HUMAN_AI" or "AI_AI"
- **Win Probability**: Estimated chances of winning for each player

### Coordinate Systems

A critical aspect of the implementation is the different coordinate systems:

1. **Backend**: Uses XY coordinates (row, column)
2. **Frontend**: Uses Cube Coordinates {q, r, s} (axial hexagonal grid)

Conversion utilities handle translation between these systems.

## Technical Challenges

The project addresses several technical challenges:

1. **Coordinate System Translation**: Converting between hex grid and array indices
2. **Game State Synchronization**: Maintaining consistent state between frontend and backend using REST API calls (including frontend-controlled AI vs AI game progression)
3. **AI Integration**: Incorporating the reinforcement learning model for move generation
4. **Error Handling**: Robust handling of invalid moves or unexpected server responses
5. **Win Detection Consistency**: Implementing win checks on both frontend and backend

## Development Status

The project has successfully transitioned from WebSockets to REST API. Current efforts focus on:

1. API path consistency (ensuring all endpoints use consistent prefixes)
2. Comprehensive error handling
3. Full testing of game interactions
4. Documentation updates

## Future Considerations

Potential areas for future development include:

1. Enhanced AI difficulty levels
2. Multiplayer functionality
3. Game replay and analysis features
4. Performance optimizations for larger board sizes
5. Mobile responsiveness improvements

This Hex game implementation represents a modern approach to classic board game development, combining the simplicity of REST APIs with the power of machine learning for engaging gameplay. 