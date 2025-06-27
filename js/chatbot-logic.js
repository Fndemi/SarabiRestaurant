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

<<<<<<< HEAD
// Store conversation history for API
let conversationHistory = [];
=======
// Sample responses
const responses = {
  popular:
    "Our Signature Tilapia dish is the most popular! It's lake Victoria tilapia in coconut curry with spinach.",
  vegan:
    "Yes! We have several vegan options including our African Lentil Bolognese and plant-based burgers.",
  hours: "We're open daily from 9:00 AM to 12:00 AM.",
};
>>>>>>> origin/main

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
<<<<<<< HEAD
chatForm.addEventListener("submit", async (e) => {
=======
chatForm.addEventListener("submit", (e) => {
>>>>>>> origin/main
  e.preventDefault();
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (message) {
    addMessage(message, true);
<<<<<<< HEAD
    conversationHistory.push({ role: "user", content: message });
=======
>>>>>>> origin/main
    input.value = "";

    // Show loading indicator
    loadingIndicator.classList.remove("hidden");
    chatMessages.scrollTop = chatMessages.scrollHeight;

<<<<<<< HEAD
    try {
      // Make API call to your FastAPI backend
      const response = await fetch(`${window.CONFIG.API_BASE_URL}${window.CONFIG.ENDPOINTS.CHAT}`, {
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
=======
    // Simulate bot response after delay
    setTimeout(() => {
      loadingIndicator.classList.add("hidden");

      let response =
        "I can help with information about our menu, hours, or reservations. Could you clarify?";
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes("popular")) {
        response = responses.popular;
      } else if (lowerMsg.includes("vegan")) {
        response = responses.vegan;
      } else if (lowerMsg.includes("hour") || lowerMsg.includes("open")) {
        response = responses.hours;
      }

      addMessage(response, false);
    }, 1500);
>>>>>>> origin/main
  }
});

// Quick prompt buttons
document.querySelectorAll(".prompt-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
<<<<<<< HEAD
    const userInput = document.getElementById("userInput");
    userInput.value = btn.textContent.trim();
    // Trigger the form submission
=======
    document.getElementById("userInput").value = btn.textContent.trim();
>>>>>>> origin/main
    chatForm.dispatchEvent(new Event("submit"));
  });
});
