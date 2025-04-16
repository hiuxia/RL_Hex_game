# Project Status and WebSocket Migration

## Overview

This document summarizes the changes made to migrate from WebSocket connections to REST API for the Hex game application, as well as recent API standardization efforts.

## Changes Made

### Frontend Changes

1. **NewGameOptions.tsx**
   - Replaced WebSocket-based game creation with REST API calls
   - Updated API endpoint paths to include 'api/' prefix
   - Added better error handling with content-type checking
   - Added additional debugging logs

2. **Game Page**
   - No changes needed as it was already using the REST API for data fetching and game state management

3. **gameStore.ts**
   - Updated all API endpoints to consistently use the 'api/' prefix
   - Fixed endpoint paths for move, ai_move, undo, and restart operations
   - Improved error handling for API responses

### Backend Changes

1. **asgi.py**
   - Updated to clarify it only handles HTTP connections, not WebSocket connections
   - Removed any WebSocket-related configurations

2. **settings.py**
   - Enhanced CORS configuration to allow requests from both localhost and 127.0.0.1
   - Ensured no WebSocket packages (like Channels) are included in INSTALLED_APPS

3. **urls.py**
   - Standardized all endpoints to use the 'api/' prefix
   - Consolidated duplicate endpoints
   - Created a consistent URL structure for all game-related actions

## API Standardization

1. **Consistent URL Structure**
   - All API endpoints now follow a consistent pattern with the '/api/' prefix
   - Game-related endpoints: '/api/games/...'
   - AI game-related endpoints: '/api/ai_games/...'

2. **Endpoint Fixes**
   - Updated the following endpoints:
     - `/games/{game_id}/move/` → `/api/games/{game_id}/move/`
     - `/games/{game_id}/ai_move/` → `/api/games/{game_id}/ai_move/`
     - `/games/{game_id}/undo/` → `/api/games/{game_id}/undo/`
     - `/games/{game_id}/restart/` → `/api/games/{game_id}/restart/`
     - `/ai_games/{game_id}/` → `/api/ai_games/{game_id}/`

## Known Issues

1. **Fixed API Path Inconsistency**
   - ✓ Resolved inconsistency between frontend API calls and backend URL configuration
   - ✓ Standardized all endpoints to use the 'api/' prefix

2. **Content Type Errors**
   - ✓ Added handling for non-JSON responses to prevent parsing errors
   - ✓ Improved error logging to capture HTML error pages when returned instead of JSON

3. **Frontend Win Detection Logic**
   - ✓ Corrected the win detection logic in `gameLogic.ts` to use the correct borders for red and blue players.

4. **NaN Probability Display**
   - ✓ Fixed the issue where win probability displayed as NaN by handling case mismatch ("AI" vs "ai") between backend and frontend and adding default values.

5. **AI vs AI Mode Flow**
   - ✓ Addressed the bug where the backend ran AI vs AI games too quickly, causing the frontend to miss moves.
   - ✓ Modified the backend to make only one AI move at a time per request.
   - ✓ Introduced a new API endpoint (`/api/ai_games/{game_id}/next_move/`) for the frontend to trigger the next AI move.
   - ✓ Replaced the frontend polling mechanism with a request-based approach for AI vs AI games.
   - ✓ Added an "Auto Moves" toggle button with a configurable delay (currently 3s) for better control and visualization.

## Next Steps

1. ✓ Verify all API endpoints are consistently defined in both frontend and backend
2. ✓ Test all game interactions to ensure smooth play with standardized REST endpoints
3. ✓ Update documentation to reflect the consistent API structure
4. Consider adding more comprehensive error logging in both frontend and backend
5. Add better mobile responsiveness for the game interface

## Error Resolution

The system now uses a standardized REST API structure for all communication between frontend and backend. The API path inconsistency issues have been resolved by:

1. Updating all backend URL patterns to consistently use the 'api/' prefix
2. Modifying all frontend API calls to match the standardized URL structure
3. Updating documentation to reflect the new consistent API pattern
4. Improving error handling to provide more meaningful error messages

By standardizing the API URL structure, we've eliminated confusion between frontend and backend, reduced the chance of errors, and simplified future maintenance.

## Reference

Error that was fixed:
```
Error during game creation process: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

This error occurred because the server was returning HTML instead of JSON when creating a new game. The solution involved:
1. Correcting API endpoints to include the 'api/' prefix
2. Adding content-type checking before attempting to parse JSON
3. Improving error handling to provide more meaningful error messages 