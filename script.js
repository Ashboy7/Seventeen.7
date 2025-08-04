async function startTalking() {
  const utterance = new SpeechSynthesisUtterance("What would you like to talk about?");
  speechSynthesis.speak(utterance);

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("chat").innerHTML += `<p><b>You:</b> ${transcript}</p>`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: transcript }]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    document.getElementById("chat").innerHTML += `<p><b>Fox AI:</b> ${reply}</p>`;

    const replySpeech = new SpeechSynthesisUtterance(reply);
    speechSynthesis.speak(replySpeech);
  };
      }
