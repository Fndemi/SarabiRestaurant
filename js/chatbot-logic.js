// Chatbot Toggle
const chatbotTriggerBtn = document.getElementById("chatbotTriggerBtn");
const chatbotContainer = document.getElementById("chatbotContainer");
const closeChatbot = document.getElementById("closeChatbot");

chatbotTriggerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  chatbotContainer.classList.remove("hidden");
  document.getElementById("userInput").focus();
});

closeChatbot.addEventListener("click", () => {
  chatbotContainer.classList.add("hidden");
});

// Close when clicking outside
chatbotContainer.addEventListener("click", (e) => {
  if (e.target === chatbotContainer) {
    chatbotContainer.classList.add("hidden");
  }
});

// Chat Functionality
const chatForm = document.getElementById("chatForm");
const chatMessages = document.getElementById("chatMessages");
const loadingIndicator = document.getElementById("loadingIndicator");

// Store conversation history for API
let conversationHistory = [];

// Updated addMessage function with icons
function addMessage(text, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `flex gap-3 items-end ${
    isUser ? "justify-end" : "justify-start"
  }`;

  if (isUser) {
    // User message (right side)
    messageDiv.innerHTML = `
      <div class="text-right flex-1">
        <div class="inline-block bg-[#F0D1D1] rounded-lg p-3 max-w-[80%]">
          <p>${text}</p>
        </div>
      </div>
      <div class="chat-icon">
        <i class="fas fa-user"></i>
      </div>
    `;
  } else {
    // AI message (left side)
    messageDiv.innerHTML = `
      <div class="chat-icon">
        <i class="fas fa-robot"></i>
      </div>
      <div class="flex-1">
        <div class="inline-block bg-[#F0D1D1] bg-opacity-20 rounded-lg p-3 max-w-[80%]">
          <p>${text}</p>
        </div>
      </div>
    `;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle form submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (message) {
    addMessage(message, true);
    conversationHistory.push({ role: "user", content: message });
    input.value = "";

    // Show loading indicator
    loadingIndicator.classList.remove("hidden");
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      // Make API call to your FastAPI backend
      const response = await fetch("https://chatbot-api-latest.onrender.com/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation: conversationHistory
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.response;
      
      // Add bot response to conversation history
      conversationHistory.push({ role: "assistant", content: botResponse });
      
      // Hide loading indicator and show response
      loadingIndicator.classList.add("hidden");
      addMessage(botResponse, false);
      
    } catch (error) {
      console.error('Error calling API:', error);
      loadingIndicator.classList.add("hidden");
      
      // Fallback response if API fails
      const fallbackResponse = "I'm sorry, I'm having trouble connecting right now. Please try again later or contact us directly for assistance.";
      addMessage(fallbackResponse, false);
    }
  }
});

// Quick prompt buttons
document.querySelectorAll(".prompt-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("userInput").value = btn.textContent.trim();
    chatForm.dispatchEvent(new Event("submit"));
  });
});
