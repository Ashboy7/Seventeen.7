const OPENAI_API_KEY = 'your-openai-api-key';

const chatDiv = document.getElementById('chat');
const userInput = document.getElementById('userInput');

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  userInput.value = "";

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  appendMessage("VisionVoice AI", reply);
  speak(reply);
}

function appendMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<b>${sender}:</b> ${text}`;
  chatDiv.appendChild(messageDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// 🎙️ Speech Recognition
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    userInput.value = voiceText;
    sendMessage();
  };

  recognition.start();
}

// 🗣️ Text-to-Speech
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speechSynthesis.speak(speech);
}

// 🖼️ Image Generator
async function generateImage() {
  const prompt = document.getElementById('imagePrompt').value;
  const resultDiv = document.getElementById('generatedImage');
  resultDiv.innerHTML = "Generating image...";

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "512x512"
    })
  });

  const data = await res.json();
  const imageUrl = data.data[0].url;
  resultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
}
