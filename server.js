const express = require('express');
const path = require('path');
const app = express();

// Render 會自動分配一個 PORT
const PORT = process.env.PORT || 3000;

// 讓伺服器可以存取當前目錄下的檔案
app.use(express.static(__dirname));

// 當有人拜訪首頁時，送出 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatbot1.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});