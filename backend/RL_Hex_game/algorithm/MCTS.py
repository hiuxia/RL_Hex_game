import numpy as np
import torch
from .GameLogic import HexGame

class MCTSNode:
    def __init__(self, game_state: HexGame, prior: float, parent=None):
        # 节点数据保留在CPU（树结构操作不适合GPU加速）
        self.game_state = game_state 
        self.parent = parent
        self.children = {}
        self.visit_count = 0
        self.total_value = 0.0
        self.prior = prior

class MCTS:
    #################################################################################################################################################
    def __init__(self, model, simulations=2, c_puct=2.0, device=('cuda' if torch.cuda.is_available() else 'cpu')):#########<- Simluations，C_puct##
        self.model = model.to(device)
        self.simulations = simulations
        self.c_puct = c_puct
        self.device = device

    def search(self, initial_game: HexGame) -> dict:
        root_node = MCTSNode(initial_game, prior=0.0)
        for _ in range(self.simulations):
            node = root_node
            env = HexGame()
            env.insert(node.game_state.output())  # 复制初始状态
            #print("----Process01 Passed----")###########################################
            while node.children and not env.is_terminal():
                action = self._select_action(node)  # GPU加速选择
                env.make_move(*action)
                #env.board = (-1 *np.array(env.board).T).tolist()
                node = node.children[action]
            #print("----Process02 Passed----")###########################################
            if env.is_terminal() == 0:
                # GPU加速模型预测
                #make sure the board is flipped or not
                if env.current_player == -1 and np.sum(np.array(env.board)) == 1:
                    env.board = (-1* np.array(env.board)).T.tolist() # Flip the board
                    env.last_moves = (np.array(env.last_moves)).T.tolist() # Flip the board
                input_tensor = self._state_to_tensor(env.output()).to(self.device)
                with torch.no_grad():
                    policy_logits, value = self.model(input_tensor)
                policy_probs = torch.softmax(policy_logits, dim=-1).view(11, 11)
                # GPU加速生成合法动作掩码
                legal_actions = self._get_legal_actions(env)
                legal_mask = torch.zeros(11, 11, device=self.device)
                for x, y in legal_actions:
                    legal_mask[x, y] = 1.0
                masked_probs = policy_probs * legal_mask
                masked_probs /= masked_probs.sum()
                # 创建子节点（CPU操作）
                for x, y in legal_actions:
                    prior = masked_probs[x, y].item()  # 取回标量值
                    child_env = HexGame()
                    child_env.insert(env.output())
                    child_env.make_move(x, y)
                    #child_env.board = (-1 *np.array(child_env.board).T).tolist()
                    node.children[(x, y)] = MCTSNode(child_env, prior=prior, parent=node)
                
                value = value.item()  # 取回标量值
            #print("----Process03 Passed----")###########################################
            winner = env.is_terminal()
            final_value = 1.0 if winner == 1 else -1.0
            self._backpropagate(node, final_value)
            #print("----Process04 Passed----")###########################################
            #print(f"Simulations {_}/{self.simulations} | ")
        return self._get_final_policy(root_node)

    def _select_action(self, node: MCTSNode) -> tuple:
        actions = list(node.children.keys())
        # 将子节点数据转换为GPU张量
        N_childs = torch.tensor([c.visit_count for c in node.children.values()],dtype=torch.float32,device=self.device) #Number of Visits
        V_childs = torch.tensor([c.total_value for c in node.children.values()], dtype=torch.float32,device=self.device) #Value
        priors = torch.tensor([c.prior for c in node.children.values()],dtype=torch.float32,device=self.device)
        q = V_childs / (N_childs + 1e-8)#Prevent denominator from being ZERO
        N_parents =  torch.sqrt(torch.tensor(node.visit_count, device=self.device))
        # PUCT(Prioritized Upper Confidence Tree)：Q + c_puct * P * sqrt(N_parent) / (N_child + 1)
        scores = q + self.c_puct * priors * N_parents / (N_childs + 1)
        # 选择最高分动作
        return actions[torch.argmax(scores).item()]

    def _backpropagate(self, node: MCTSNode, value: float):
        """回溯更新（CPU操作）"""
        while node is not None:
            node.visit_count += 1
            node.total_value += value
            node = node.parent

    def _get_final_policy(self, root_node: MCTSNode) -> dict:
        """生成最终策略分布"""
        total_visits = sum(c.visit_count for c in root_node.children.values())
        return {a: c.visit_count / total_visits for a, c in root_node.children.items()}

    def _get_legal_actions(self, env: HexGame) -> list:
        legal_positions = np.argwhere(np.array(env.output()["board"]) == 0).tolist()
        return [(x, y) for x, y in legal_positions]

    def _state_to_tensor(self, state: dict) -> torch.Tensor:
        board = np.array(state["board"], dtype=np.float32)
        last_moves = np.array(state["last_moves"], dtype=np.float32)
        return torch.tensor(
            np.stack([board, last_moves], axis=0),
            dtype=torch.float32
        ).unsqueeze(0)
