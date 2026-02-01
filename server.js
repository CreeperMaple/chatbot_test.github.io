const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// ！！！重要：這是隱藏網址的關鍵，我們從環境變數讀取
// 如果在本地測試，可以直接填入網址，但在 Render 上我們要設定環境變數
const N8N_WEBHOOK_URL = process.env.N8N__WEBHOOK_URL;

app.use(express.json()); // 解析 JSON 格式的請求內容
app.use(express.static(__dirname));

// 建立一個後端 API 接口
app.post('/api/chat', async (req, res) => {
    try {
        const { text, sessionId } = req.body;

        // 在後端發送請求給 n8n (這段是在伺服器跑的，使用者看不到)
        const response = await fetch(`${N8N_WEBHOOK_URL}?sessionId=${sessionId}&text=${encodeURIComponent(text)}&language=zh-TW&role=user`, {
            method: 'POST'
        });

        const data = await response.json();
        res.json(data); // 把 n8n 的回覆傳回給前端網頁
    } catch (error) {
        console.error("後端轉傳失敗:", error);
        res.status(500).json({ error: "伺服器內部錯誤" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatbot1.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
