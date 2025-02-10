const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  let fileBuffer = []; // Store incoming file chunks
  let fileName = "";

  ws.on("message", (data) => {
    const message = JSON.parse(data);

    if (message.event === "startUpload") {
      fileName = `uploaded_${Date.now()}_${message.filename}`;
      fileBuffer = []; 
      console.log(`Receiving file: ${message.filename}`);
    } else if (message.event === "fileChunk") {
      fileBuffer.push(Buffer.from(message.chunk, "base64"));
    } else if (message.event === "endUpload") {
      console.log(`File received: ${fileName}`);
      const filePath = path.join(__dirname, "uploads", fileName);

      fs.writeFileSync(filePath, Buffer.concat(fileBuffer));

      // Process file (convert to grayscale)
      processFile(filePath, ws, fileName);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.send(
    JSON.stringify({
      event: "welcome",
      message: "Connected to WebSocket server",
    })
  );
});

// Function to process the file and send it back
async function processFile(inputPath, ws, fileName) {
  const outputPath = path.join(__dirname, "processed", `processed_${fileName}`);

  console.log("Processing file...");
  await sharp(inputPath).grayscale().toFile(outputPath);

  console.log("Processing complete! Sending file back...");

  // Read processed file in chunks and send back
  const fileStream = fs.createReadStream(outputPath);
  fileStream.on("data", (chunk) => {
    ws.send(
      JSON.stringify({
        event: "processedChunk",
        chunk: chunk.toString("base64"),
      })
    );
  });

  fileStream.on("end", () => {
    ws.send(JSON.stringify({ event: "endProcessing" }));
    console.log("File sent back to client.");
  });
}

console.log("WebSocket server running on ws://localhost:8080");
