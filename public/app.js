const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => console.log("Connected to WebSocket server");

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.event === "processedChunk") {
        // Append received chunk to the processed file
        receivedChunks.push(message.chunk);
    } 
    else if (message.event === "endProcessing") {
        document.getElementById("status").innerText = "Processing complete!";
        
        // Convert received chunks into an image
        const processedBlob = new Blob(
            [new Uint8Array(receivedChunks.map(atob).flatMap(b => [...b].map(ch => ch.charCodeAt(0))))], 
            { type: "image/png" }
        );
        document.getElementById("processedImage").src = URL.createObjectURL(processedBlob);
    }
};

document.getElementById("sendBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) return alert("Please select a file.");

    const CHUNK_SIZE = 64 * 1024;
    const reader = new FileReader();
    let offset = 0;
    receivedChunks = [];

    document.getElementById("originalImage").src = URL.createObjectURL(file);

    ws.send(JSON.stringify({ event: "startUpload", filename: file.name }));

    reader.onload = (e) => {
        ws.send(JSON.stringify({ event: "fileChunk", chunk: e.target.result.split(",")[1] }));
        offset += CHUNK_SIZE;
        document.getElementById("progressBar").value = (offset / file.size) * 100;

        if (offset < file.size) {
            readNextChunk();
        } else {
            ws.send(JSON.stringify({ event: "endUpload" }));
            document.getElementById("status").innerText = "Uploading complete! Processing...";
        }
    };

    function readNextChunk() {
        const slice = file.slice(offset, offset + CHUNK_SIZE);
        reader.readAsDataURL(slice);
    }

    readNextChunk();
});
