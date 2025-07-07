function toggleTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

function sendChat() {
  const input = document.getElementById("chatInput").value;
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;
  chatBox.innerHTML += `<p><b>Fox AI:</b> ${mockResponse(input)}</p>`;
  document.getElementById("chatInput").value = "";
}

function generateImage() {
  const prompt = document.getElementById("imagePrompt").value;
  document.getElementById("imageResult").innerHTML = `<p><b>Generated:</b> "${prompt}"</p><img src="https://via.placeholder.com/300?text=${encodeURIComponent(prompt)}"/>`;
}

function generateText() {
  const type = document.getElementById("textType").value;
  const prompt = document.getElementById("textPrompt").value;
  document.getElementById("textResult").innerHTML = `<p><b>${type}:</b> ${mockResponse(prompt)}</p>`;
}

function mockResponse(prompt) {
  return `This is a placeholder response for: "${prompt}". Real AI response goes here.`;
}
