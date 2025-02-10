# Real-Time Bidirectional File Transfer & Processing(Grayscalling image)

## 🚀 Overview

This project enables **real-time bidirectional file transfer** over **WebSockets**, allowing users to:

1. **Upload a file** (e.g., an image) from the client.
2. **Stream the file to the server in real-time**.
3. **Process the file on the server** (apply a **grayscale filter** using `sharp`).
4. **Stream the modified file back to the client**.
5. **Reconstruct and display the processed file on the client in real-time**.

This system ensures **low latency, no data loss, and smooth file transmission**, making it ideal for real-time applications like image enhancement tools, live document processing, or multimedia streaming.

---

## 📌 Features

✅ **Bidirectional WebSocket-based file transfer**\
✅ **Real-time chunked data transmission**\
✅ **Image processing using **``** (Grayscale transformation)**\
✅ **Dark-themed, modern UI**\
✅ **Progress tracking and live file streaming**\
✅ **Scalable and robust architecture**

---

## 🏗️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js with WebSockets (`ws`)
- **Processing:** `sharp` (for image manipulation)
- **File Storage:** Local filesystem (`fs` module)

---

## 📂 Project Structure

```
realtime-file-transfer/
│── server.js                 # WebSocket server (Node.js)
│── public/
│   ├── index.html            # Frontend UI
│   ├── styles.css            # Dark-themed UI styles
│   ├── app.js                # WebSocket client logic
│── uploads/                  # Temporary storage for uploaded files
│── processed/                # Processed files storage
│── README.md                 # Documentation
│── package.json              # Dependencies & scripts
```

---

## 🚀 Installation & Setup

### 🔧 Prerequisites

- Node.js (>= 16.x)
- npm or yarn

### 📥 Clone the Repository

```sh
git clone https://github.com/your-repo/realtime-file-transfer.git
cd realtime-file-transfer
```

### 📦 Install Dependencies

```sh
npm install
```

### 🚀 Run the WebSocket Server

```sh
node server.js
```

### 🌐 Open the Client

Simply open `public/index.html` in a browser.

Alternatively, start a local static server:

```sh
npx serve public
```

---

## ⚙️ How It Works

### 1️⃣ **Client Uploads File**

- The client selects a file and streams it to the server in **base64-encoded chunks** over WebSockets.

### 2️⃣ **Server Receives & Processes the File**

- The server reconstructs the file and applies a **grayscale filter** using `sharp`.

### 3️⃣ **Server Streams Processed File Back**

- The modified file is streamed back to the client in **real-time**.

### 4️⃣ **Client Reconstructs & Displays the File**

- The frontend dynamically updates and displays the **processed image**.

---

## 📜 API & WebSocket Events

### **Client → Server Events**

| Event         | Description                         |
| ------------- | ----------------------------------- |
| `startUpload` | Initiates file upload with filename |
| `fileChunk`   | Sends a chunk of the file (base64)  |
| `endUpload`   | Signals end of file upload          |

### **Server → Client Events**

| Event            | Description                          |
| ---------------- | ------------------------------------ |
| `welcome`        | Sent on initial WebSocket connection |
| `processedChunk` | Sends a chunk of the processed file  |
| `endProcessing`  | Signals the end of file processing   |

---

## 🎨 UI Preview



---

## 🔥 Future Enhancements

- ✅ Multi-user support with WebSocket rooms
- ✅ Support for different file types (PDF, audio, video)
- ✅ Additional image processing options (resize, blur, watermark)
- ✅ Secure file storage with **AWS S3** or **MongoDB GridFS**

---

## 🤝 Contribution Guide

1. Fork the repo & create a new branch.
2. Make your changes & commit with a clear message.
3. Push to your branch & create a **Pull Request**.

---

## 🛠 Troubleshooting

**WebSocket connection issues?**

- Ensure the server is running (`node server.js`).
- Check browser console logs (`F12 → Console`).
- Restart the WebSocket connection (`ws.close(); ws = new WebSocket(...)`).

**File processing not working?**

- Ensure `sharp` is installed (`npm install sharp`).
- Verify the server has **write permissions** to `uploads/` and `processed/`.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ✨ Author

**Sahil Verma** - [GitHub](https://github.com/sahil-verma-9696) | [Email](mailto\:sahils.verma.1000@gmail.com)

