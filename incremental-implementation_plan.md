RL Hex Game - Incremental Refactoring Plan
Version: 1.1
Date: April 16, 2025

1. Introduction
This document outlines a prioritized, incremental plan for refactoring and improving the RL Hex Game project, updated based on clarifications regarding the RL code structure. It leverages the capabilities of the Cursor AI code editor, including its rule system (.cursor/rules/) and context-aware features (@ file/rule referencing), to guide the process.

2. Prerequisites
Cursor AI Code Editor installed and operational.

The RL Hex Game project codebase is open within Cursor.

The .cursor/rules/ directory is populated with the defined project rule files (project-overview.mdc, frontend-standards.mdc, backend-standards.mdc, api-guidelines.mdc, coordinate-system.mdc, rl-agent-interaction.mdc, refactoring-goals.mdc). Ensure these files have been updated to reflect the clarification that Hexgame/utils/ contains the active RL code.

3. General Workflow
Each refactoring step should generally follow this iterative process:

Define Task: Clearly identify the specific goal for the current step based on the prioritized plan.

Select Context: In Cursor Chat or using Cmd-K, use the @ symbol to reference the relevant code files (@path/to/your/file.ext) and rule documents (@./.cursor/rules/rule-name.mdc) that provide necessary context for the task.

Prompt AI: Formulate a clear, actionable prompt instructing the AI to perform the task (e.g., generate code, refactor, explain, identify issues) based on the provided context and relevant rules. Ask the AI to outline its plan first for complex changes.

Review & Iterate: Carefully examine the AI's output (code, suggestions, explanations). Verify correctness, ensure adherence to project rules and standards, and check alignment with the refactoring goal. Use follow-up prompts to refine the output if necessary.

Test: Implement or integrate the changes and perform thorough testing (unit tests, integration tests, manual testing as appropriate).

Commit: Once a logical step or phase is completed and verified, commit the changes to version control with a clear commit message.

4. Prioritized Refactoring Plan
Execute the following phases and steps in the specified order.

Phase 1: Stabilize Currently Used RL Code & Analyze Inconsistencies

Goal: Fix critical configuration in the active RL code path (Hexgame/utils/) and understand the differences compared to the algorithm/ directory.

Git Branch: git checkout -b refactor/stabilize-utils-rl

Task: Make RL Model Path Configurable in utils/ (Priority #1a)

Context: @./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py, @./backend/RL_Hex_game/Hex/Hex/settings.py, @./backend/RL_Hex_game/Hex/Hexgame/consumers.py, @./.cursor/rules/backend-standards.mdc, @./.cursor/rules/rl-agent-interaction.mdc, @./.cursor/rules/refactoring-goals.mdc

Example Prompt:

Objective: Implement Priority #1a from `@./.cursor/rules/refactoring-goals.mdc`.
Context: `@./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py`, `@./backend/RL_Hex_game/Hex/Hex/settings.py`, `@./.cursor/rules/rl-agent-interaction.mdc`
Request: Refactor the `HexAI` class in `utils/Algorithm.py` to load the model path from a new Django setting `RL_MODEL_PATH` (add this setting definition to `settings.py`) instead of the current hardcoded path. Include error handling for missing setting/invalid path. Outline your steps first. Also, check if `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py` hardcodes the path and update it if necessary.

Verification: Add RL_MODEL_PATH to settings.py. Test AI move functionality relies on the setting.

Task: Verify Imports in consumers.py (Priority #1b)

Context: @./backend/RL_Hex_game/Hex/Hexgame/consumers.py, @./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py, @./.cursor/rules/backend-standards.mdc, @./.cursor/rules/rl-agent-interaction.mdc

Example Prompt:

Verify that `@./backend/RL_Hex_game/Hex/Hexgame/consumers.py` correctly imports `HexAI` and any other necessary RL components specifically from the `@./backend/RL_Hex_game/Hex/Hexgame/utils/` directory, as stated in `@./.cursor/rules/rl-agent-interaction.mdc`. List the relevant import statements found and confirm they point to `utils`.

Verification: Manually confirm the import paths in consumers.py.

Task: Analyze Inconsistencies (Priority #2a)

Context: @./backend/RL_Hex_game/Hex/Hexgame/utils/, @./backend/RL_Hex_game/algorithm/, @./.cursor/rules/rl-agent-interaction.mdc, @./.cursor/rules/refactoring-goals.mdc

Example Prompt:

Objective: Perform analysis for Priority #2a from `@./.cursor/rules/refactoring-goals.mdc`.
Context: Code within `@./backend/RL_Hex_game/Hex/Hexgame/utils/` and `@./backend/RL_Hex_game/algorithm/`, rule `@./.cursor/rules/rl-agent-interaction.mdc`.
Request: Compare the implementations of key RL files (e.g., `Algorithm.py`, `Hexmodel.py`, `MCTS.py` if present in both) between the `utils/` and `algorithm/` directories. Summarize the main functional differences, potential improvements in `algorithm/`, or potential bugs in the currently used `utils/` code.

Verification: Review the AI's analysis. Manually inspect key differences. Document findings for the future decision (Task #2b).

Version Control:

git add .
git commit -m "Phase 1: Stabilize utils RL code (config path, imports) and analyze inconsistencies"

Phase 2: Core Feature Enhancement (Targeting utils/ code)

Goal: Improve the AI opponent by integrating MCTS into the currently used code path.

Git Branch: git checkout -b feature/integrate-mcts-utils (or continue)

Task: Improve & Integrate RL Algorithm (MCTS) in Active Code (Priority #3)

Context: @./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py, @./backend/RL_Hex_game/algorithm/MCTS.py (or utils/MCTS.py if exists), @./backend/RL_Hex_game/Hex/Hexgame/consumers.py, @./.cursor/rules/rl-agent-interaction.mdc, @./.cursor/rules/refactoring-goals.mdc

Example Prompt:

Objective: Implement Priority #3 from `@./.cursor/rules/refactoring-goals.mdc`.
Context: `@./backend/RL_Hex_game/Hex/Hexgame/utils/Algorithm.py`, MCTS implementation (likely `@./backend/RL_Hex_game/algorithm/MCTS.py`, confirm if one exists in `utils/`), `@./.cursor/rules/rl-agent-interaction.mdc`.
Request: Refactor the `predict` method in `utils/Algorithm.py` to incorporate MCTS search using the `MCTS` class (specify which MCTS file to use based on Phase 1 analysis). Ensure it's initialized correctly and the game state is passed appropriately to `mcts.search()`. The final move should be based on MCTS results. Outline your plan first.

Verification: Test ai_move extensively. Assess AI performance.

Version Control:

git add .
git commit -m "Phase 2: Integrate MCTS into active RL prediction (utils path)"

Phase 3: Frontend Structure & Decoupling

Goal: Prepare the frontend for logic migration.

Git Branch: git checkout -b feature/frontend-structure

Task: Refine UI Components, Add Tests & Mocks (Priority #4 - Initial)

Context: @./hex-ai-frontend/src/components/, @./hex-ai-frontend/src/app/(app)/, @./.cursor/rules/frontend-standards.mdc, @./.cursor/rules/refactoring-goals.mdc, @./.cursor/rules/react_component_template.mdc

Example Prompts: (Same as previous plan)

(Component Analysis): Analyze components in @./hex-ai-frontend/src/components/hex/. Suggest opportunities for simplification or creating smaller, reusable sub-components according to @./.cursor/rules/frontend-standards.mdc.

(Test Structure): Generate basic Jest/React Testing Library unit test structure for @./hex-ai-frontend/src/components/dashboard/NewGameOptions.tsx, covering button clicks and loading states, following goal #4 in @./.cursor/rules/refactoring-goals.mdc.

(Mock Interface): Define a TypeScript type/interface for a mock API function simulating the fetch of the game list (planned in goal #6 of @./.cursor/rules/refactoring-goals.mdc).

Verification: Review structure. Implement tests. Define mocks.

Version Control:

git add .
git commit -m "Phase 3: Refine frontend structure, add tests/mocks"

Phase 4: Major Logic Refactoring

Goal: Move core game logic to the frontend.

Git Branch: git checkout -b refactor/frontend-logic

Task: Move Core Game Logic to Frontend (Priority #5)

Context: @./hex-ai-frontend/src/store/gameStore.ts, @./hex-ai-frontend/src/lib/, @./backend/RL_Hex_game/Hex/Hexgame/utils/utils.py, @./.cursor/rules/frontend-standards.mdc, @./.cursor/rules/coordinate-system.mdc, @./.cursor/rules/refactoring-goals.mdc

Example Prompts: (Same as previous plan)

(Validation - Edit gameStore.ts): Refactor the 'requestMove' action. Before calling sendMessage, add validation to check if the target hex 'coords' is empty based on the current 'boardState'. If not empty, set an error state/log warning and return.

(Win Check - Chat): Help create a function 'checkWinCondition' in @./hex-ai-frontend/src/lib/gameLogic.ts (create if needed). Implement the Hex win logic based on @./backend/RL_Hex_game/Hex/Hexgame/utils/utils.py's check_hex_connection, but using the frontend's boardState Map and Cube coordinates. It should take boardState and player (1 or 2) and return boolean.

(Win Check Integration - Edit gameStore.ts): In 'handleGameStateUpdate', after updating boardState, call the new 'checkWinCondition'. If true, update the 'winner' state.

Verification: Test frontend validation, win checks, undo/redo logic.

Version Control:

git add .
git commit -m "Phase 4: Move core game logic (validation, win check) to frontend"

Phase 5: API Finalization & Frontend Integration

Goal: Clean up backend APIs and connect the refined frontend.

Git Branch: git checkout -b feature/api-finalization

Task: Refine API Strategy & Implement Game List API (Priority #6)

Context: @./backend/RL_Hex_game/Hex/Hexgame/views.py, @./backend/RL_Hex_game/Hex/Hexgame/urls.py, @./backend/RL_Hex_game/Hex/Hexgame/serializers.py, @./.cursor/rules/api-guidelines.mdc, @./.cursor/rules/backend-standards.mdc, @./.cursor/rules/refactoring-goals.mdc

Example Prompts: (Same as previous plan)

(Deprecation - Chat): Based on goal #6 in @./.cursor/rules/refactoring-goals.mdc and @./.cursor/rules/api-guidelines.mdc, identify REST endpoints in @./backend/RL_Hex_game/Hex/Hexgame/views.py and urls.py for move, ai_move, undo, restart that can be deprecated/removed.

(New Endpoint - Chat): Implement the GET /api/games/ endpoint in @./backend/RL_Hex_game/Hex/Hexgame/views.py as GameListView. Fetch all HexGame objects, serialize using HexGameSerializer (or a summary version), and return as JSON list. Register the URL.

Verification: Test new API. Ensure deprecated endpoints removed/disabled.

Task: Final UI Integration (Priority #4 - Final)

Context: @./hex-ai-frontend/src/components/dashboard/GameListTable.tsx, @./hex-ai-frontend/src/app/(app)/game/[gameId]/page.tsx, @./hex-ai-frontend/src/store/gameStore.ts, @./.cursor/rules/frontend-standards.mdc

Example Prompts: (Same as previous plan)

(Fetch Integration - Edit GameListTable.tsx): Refactor this component. Remove placeholder data. Add logic to fetch data from the new GET /api/games/ endpoint on mount and display the fetched games.

(Game Page Review - Chat): Review @./hex-ai-frontend/src/app/(app)/game/[gameId]/page.tsx. Ensure it correctly uses state derived from the frontend game logic (Phase 4) and replaces mock API calls with actual gameStore actions connected to the backend.

Verification: Test dashboard list. Test end-to-end game flow.

Version Control:

git add .
git commit -m "Phase 5: Finalize API strategy and integrate frontend logic"
# Optional: Merge branches if necessary

5. Conclusion
This updated plan prioritizes stabilizing the currently active backend code path (Hexgame/utils/) before proceeding with major feature enhancements or architectural changes. Remember to commit frequently, test thoroughly, and always review the AI's output. Adapt the plan based on the findings during the inconsistency analysis (Phase 1, Task 3).