# RL Hex Game - Incremental Refactoring Plan

Version: 1.0

Date: April 16, 2025

## 1. Introduction

This document outlines a prioritized, incremental plan for refactoring and improving the RL Hex Game project. It leverages the capabilities of the Cursor AI code editor, including its rule system (.cursor/rules/) and context-aware features (@ file/rule referencing), to guide the process.

## 2. Prerequisites

Cursor AI Code Editor installed and operational.
The RL Hex Game project codebase is open within Cursor.
The .cursor/rules/ directory is populated with the defined project rule files (project-overview.mdc, frontend-standards.mdc, backend-standards.mdc, api-guidelines.mdc, coordinate-system.mdc, rl-agent-interaction.mdc, refactoring-goals-mdc). The refactoring-goals.mdc file should reflect the prioritized list below.

## 3. General Workflow

Each refactoring step should generally follow this iterative process:

- Define Task: Clearly identify the specific goal for the current step based on the prioritized plan.
- Select Context: In Cursor Chat or using Cmd-K, use the @ symbol to reference the relevant code files (@path/to/your/file.ext) and rule documents (@./.cursor/rules/rule-name.mdc) that provide necessary context for the task.
- Prompt AI: Formulate a clear, actionable prompt instructing the AI to perform the task (e.g., generate code, refactor, explain, identify issues) based on the provided context and relevant rules.
R- eview & Iterate: Carefully examine the AI's output (code, suggestions, explanations). Verify correctness, ensure adherence to project rules and standards, and check alignment with the refactoring goal. Use follow-up prompts to refine the output if necessary.
- Test: Implement or integrate the changes and perform thorough testing (unit tests, integration tests, manual testing as appropriate).
- Commit: Once a logical step or phase is completed and verified, commit the changes to version control with a clear commit message.

## 4. Prioritized Refactoring Plan

Execute the following phases and steps in the specified order.

### Phase 1: Backend Cleanup & Foundation

Goal: Stabilize the backend by fixing configuration and consolidating code.
- Git Branch: git checkout -b refactor/backend-cleanup
- Task: Make RL Model Path Configurable (Priority #1)
Context: @./backend/RL_Hex_game/algorithm/Algorithm.py, @./backend/RL_Hex_game/Hex/Hex/settings.py, @./.cursor/rules/backend-standards.mdc, @./.cursor/rules/rl-agent-interaction.mdc, @./.cursor/rules/refactoring-goals-mdc
Example Prompt:
Refactor `@./backend/RL_Hex_game/algorithm/Algorithm.py` according to goal #1 in `@./.cursor/rules/refactoring-goals.mdc`. Load the model path from a new Django setting `RL_MODEL_PATH` defined in `@./backend/RL_Hex_game/Hex/Hex/settings.py` instead of the current hardcoded path. Add necessary error handling if the setting is missing or the path is invalid. Ensure this aligns with `@./.cursor/rules/backend-standards.mdc`. Check `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py` as well and update if it loads the model directly.

Verification: Add RL_MODEL_PATH to settings.py. Test AI move functionality.
Task: Consolidate RL Algorithm Code (Priority #2)
Context: @./backend/RL_Hex_game/Hex/Hexgame/consumers.py, @./backend/RL_Hex_game/algorithm/, @./backend/RL_Hex_game/Hex/Hexgame/utils/, @./.cursor/rules/backend-standards.mdc, @./.cursor/rules/rl-agent-interaction.mdc, @./.cursor/rules/refactoring-goals.mdc
Example Prompt:
Based on goal #2 in `@./.cursor/rules/refactoring-goals.mdc` and context in `@./.cursor/rules/rl-agent-interaction.mdc`, please check imports in `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py`. Ensure RL classes (like HexAI) are imported from `@./backend/RL_Hex_game/algorithm/`, NOT from `@./backend/RL_Hex_game/Hex/Hexgame/utils/`. Propose necessary import changes. Then, help identify and safely delete duplicated RL files from the `utils/` directory.

Verification: Ensure consumers.py uses the correct imports. Verify project functionality after removing files from utils/.
Version Control:
git add .
git commit -m "Phase 1: Configure model path and consolidate RL code"

### Phase 2: Core Feature Enhancement
Goal: Improve the AI opponent by properly integrating MCTS.
Git Branch: git checkout -b feature/integrate-mcts (or continue on previous branch)
Task: Improve & Integrate RL Algorithm (MCTS) (Priority #3)
Context: @./backend/RL_Hex_game/algorithm/Algorithm.py, @./backend/RL_Hex_game/algorithm/MCTS.py, @./backend/RL_Hex_game/Hex/Hexgame/consumers.py, @./.cursor/rules/rl-agent-interaction.mdc, @./.cursor/rules/refactoring-goals.mdc
Example Prompt:
Review the `predict` method in `@./backend/RL_Hex_game/algorithm/Algorithm.py`. According to goal #3 in `@./.cursor/rules/refactoring-goals.mdc`, it should use MCTS. Analyze if it currently uses the `MCTS` class from `@./backend/RL_Hex_game/algorithm/MCTS.py`. If not, refactor `predict` to initialize and run MCTS search (`mcts.search(game_state_object)`) using the current game state, determining the best move from the MCTS policy results. How should the `game_state_object` be created or passed? Reference `@./.cursor/rules/rl-agent-interaction.mdc`.

Verification: Test ai_move extensively. Assess AI performance. Adjust MCTS parameters (simulations, c_puct) if necessary.
Version Control:
git add .
git commit -m "Phase 2: Integrate MCTS into AI move prediction"

### Phase 3: Frontend Structure & Decoupling
Goal: Prepare the frontend for logic migration by improving structure and adding tests/mocks.
Git Branch: git checkout -b feature/frontend-structure
Task: Refine UI Components, Add Tests & Mocks (Priority #4 - Initial)
Context: @./hex-ai-frontend/src/components/, @./hex-ai-frontend/src/app/(app)/, @./.cursor/rules/frontend-standards.mdc, @./.cursor/rules/refactoring-goals.mdc, @./.cursor/rules/react_component_template.mdc
Example Prompts:
(Component Analysis): Analyze components in @./hex-ai-frontend/src/components/hex/. Suggest opportunities for simplification or creating smaller, reusable sub-components according to @./.cursor/rules/frontend-standards.mdc.
(Test Structure): Generate basic Jest/React Testing Library unit test structure for @./hex-ai-frontend/src/components/dashboard/NewGameOptions.tsx, covering button clicks and loading states, following goal #4 in @./.cursor/rules/refactoring-goals.mdc.
(Mock Interface): Define a TypeScript type/interface for a mock API function simulating the fetch of the game list (planned in goal #6 of @./.cursor/rules/refactoring-goals.mdc).
Verification: Review component structure. Implement and run unit tests. Define mock interfaces/data.
Version Control:
git add .
git commit -m "Phase 3: Refine frontend structure, add tests/mocks"

### Phase 4: Major Logic Refactoring
Goal: Move core game logic (validation, win check, etc.) to the frontend.
Git Branch: git checkout -b refactor/frontend-logic
Task: Move Core Game Logic to Frontend (Priority #5)
Context: @./hex-ai-frontend/src/store/gameStore.ts, @./hex-ai-frontend/src/lib/, @./backend/RL_Hex_game/Hex/Hexgame/utils/utils.py, @./.cursor/rules/frontend-standards.mdc, @./.cursor/rules/coordinate-system.mdc, @./.cursor/rules/refactoring-goals.mdc
Example Prompts:
(Validation - Edit gameStore.ts): Refactor the 'requestMove' action. Before calling sendMessage, add validation to check if the target hex 'coords' is empty based on the current 'boardState'. If not empty, set an error state/log warning and return.
(Win Check - Chat): Help create a function 'checkWinCondition' in @./hex-ai-frontend/src/lib/gameLogic.ts (create if needed). Implement the Hex win logic based on @./backend/RL_Hex_game/Hex/Hexgame/utils/utils.py's check_hex_connection, but using the frontend's boardState Map and Cube coordinates. It should take boardState and player (1 or 2) and return boolean.
(Win Check Integration - Edit gameStore.ts): In 'handleGameStateUpdate', after updating boardState, call the new 'checkWinCondition'. If true, update the 'winner' state.
Verification: Test move validation on the frontend. Test win conditions thoroughly. Implement and test frontend undo/redo logic if applicable.
Version Control:
git add .
git commit -m "Phase 4: Move core game logic (validation, win check) to frontend"

### Phase 5: API Finalization & Frontend Integration
Goal: Clean up backend APIs based on the logic shift and connect the refined frontend.
Git Branch: git checkout -b feature/api-finalization
Task: Refine API Strategy & Implement Game List API (Priority #6)
Context: @./backend/RL_Hex_game/Hex/Hexgame/views.py, @./backend/RL_Hex_game/Hex/Hexgame/urls.py, @./backend/RL_Hex_game/Hex/Hexgame/serializers.py, @./.cursor/rules/api-guidelines.mdc, @./.cursor/rules/backend-standards.mdc, @./.cursor/rules/refactoring-goals.mdc
Example Prompts:
(Deprecation - Chat): Based on goal #6 in @./.cursor/rules/refactoring-goals.mdc and @./.cursor/rules/api-guidelines.mdc, identify REST endpoints in @./backend/RL_Hex_game/Hex/Hexgame/views.py and urls.py for move, ai_move, undo, restart that can be deprecated/removed.
(New Endpoint - Chat): Implement the GET /api/games/ endpoint in @./backend/RL_Hex_game/Hex/Hexgame/views.py as GameListView. Fetch all HexGame objects, serialize using HexGameSerializer (or a summary version), and return as JSON list. Register the URL.
Verification: Test the new game list API. Ensure deprecated REST endpoints are removed/disabled.
Task: Final UI Integration (Priority #4 - Final)
Context: @./hex-ai-frontend/src/components/dashboard/GameListTable.tsx, @./hex-ai-frontend/src/app/(app)/game/[gameId]/page.tsx, @./hex-ai-frontend/src/store/gameStore.ts, @./.cursor/rules/frontend-standards.mdc
Example Prompts:
(Fetch Integration - Edit GameListTable.tsx): Refactor this component. Remove placeholder data. Add logic to fetch data from the new GET /api/games/ endpoint on mount and display the fetched games.
(Game Page Review - Chat): Review @./hex-ai-frontend/src/app/(app)/game/[gameId]/page.tsx. Ensure it correctly uses state derived from the frontend game logic (Phase 4) and replaces mock API calls with actual gameStore actions connected to the backend.
Verification: Test dashboard game list fetching. Test the end-to-end game flow, confirming frontend logic and backend communication work correctly.
Version Control:
git add .
git commit -m "Phase 5: Finalize API strategy and integrate frontend logic"

> Optional: Merge branches if necessary

> git checkout main && git merge feature/api-finalization # (and other feature branches)

> git push origin main

## 5. Conclusion
This plan provides a structured path for refactoring the RL Hex Game project. Remember to commit changes frequently, test each step thoroughly, and always review the AI's output critically against the project's rules and goals. Adapt the plan as needed based on discoveries made during the process.
