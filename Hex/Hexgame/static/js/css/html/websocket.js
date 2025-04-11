// 在Hexgame/static/js目录下新建websocket.js
const gameSocket = new WebSocket(
    `ws://${window.location.host}/ws/game/${gameId}/`
);

// 接收消息
gameSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    // 更新游戏界面
    updateBoard(data.board);
    updateTurn(data.player_turn);
    updateWinProbability(data.win_probability);
};

// 发送动作
function sendMove(x, y) {
    gameSocket.send(JSON.stringify({
        'action': 'make_move',
        'x': x,
        'y': y
    }));
}

// AI移动按钮
document.querySelector('#ai-move').addEventListener('click', () => {
    gameSocket.send(JSON.stringify({'action': 'ai_move'}));
});