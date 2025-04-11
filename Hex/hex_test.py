import websockets
import json
import asyncio

WS_BASE = "ws://localhost:8000/ws/game/"

async def validate_response(response, expected_type):
    """统一验证响应格式"""
    assert "type" in response, "响应缺少type字段"
    assert "data" in response, "响应缺少data字段"
    assert response["type"] == expected_type, f"预期类型{expected_type}，实际收到{response['type']}"
    return response["data"]

async def create_game_websocket(mode):
    """通过WebSocket创建游戏"""
    async with websockets.connect(WS_BASE + "new/") as ws:
        # 发送创建游戏请求
        await ws.send(json.dumps({
            "action": "create_game",
            "mode": mode
        }))
        
        # 接收创建响应
        response = json.loads(await ws.recv())
        data = await validate_response(response, "game_created")
        return data["game_id"]

async def test_human_ai_mode():
    """测试HUMAN_AI模式"""
    print("\n=== 测试HUMAN_AI模式 ===")
    
    # 1. 通过WebSocket创建游戏
    game_id = await create_game_websocket("HUMAN_AI")
    print(f"✓ 创建游戏成功 ID: {game_id}")

    async with websockets.connect(WS_BASE + f"{game_id}/") as ws:
        # [原有测试逻辑保持不变...]
        # 2. 验证初始状态
        init_resp = json.loads(await ws.recv())
        init_data = await validate_response(init_resp, "game_state")
        assert init_data["mode"] == "HUMAN_AI", "游戏模式错误"

        # 3. 测试人类移动
        print("\n--- 测试人类移动 ---")
        await ws.send(json.dumps({"action": "move", "x": 0, "y": 0}))
        move_resp = json.loads(await ws.recv())
        move_data = await validate_response(move_resp, "game_update")
        assert move_data["board"][0][0] != 0, "人类落子失败"
        print("✓ 人类移动成功")

        # [其余测试步骤保持不变...]

async def test_ai_ai_mode():
    """测试AI_AI模式"""
    print("\n=== 测试AI_AI模式 ===")
    
    # 1. 通过WebSocket创建游戏
    game_id = await create_game_websocket("AI_AI")
    print(f"✓ 创建游戏成功 ID: {game_id}")

    async with websockets.connect(WS_BASE + f"{game_id}/") as ws:
        # [原有测试逻辑保持不变...]
        # 2. 验证初始状态
        init_resp = json.loads(await ws.recv())
        init_data = await validate_response(init_resp, "game_state")
        assert init_data["player_turn"] in ["AI_1", "AI_2"]

        # 3. 自动对战测试
        print("\n--- 自动对战测试 ---")
        for step in range(121):
            await ws.send(json.dumps({"action": "ai_move"}))
            update_resp = json.loads(await ws.recv())
            update_data = await validate_response(update_resp, "game_update")
            
            # 打印进度
            filled = sum(cell !=0 for row in update_data["board"] for cell in row)
            print(f"第{step+1}步 | 落子数: {filled} | 当前玩家: {update_data['player_turn']}")
            
            if update_data.get("winner"):
                print(f"游戏结束！胜者: {update_data['winner']}")
                return

        # 4. 最终状态验证
        final_resp = json.loads(await ws.recv())
        final_data = await validate_response(final_resp, "game_state")
        assert final_data["winner"] in ["AI_1", "AI_2", "draw"]
        print(f"✓ 游戏结束验证成功 结果: {final_data['winner']}")

async def main():
    """主测试流程"""
    try:
        await test_human_ai_mode()
        await test_ai_ai_mode()
        print("\n所有测试通过！")
    except Exception as e:
        print(f"\n测试失败: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())