import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ChatBot.css';

const defaultIntroText = `We are the application bot`;
const sampleQuestions = [
  "Can you tell me about the scholarship requirements?",
  "What documents do I need to submit?"
];

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [time, setTime] = useState(0);
  const navigate = useNavigate(); // Changed from useRouter to useNavigate

  useEffect(() => {
    setChatLog([{ role: 'model', content: defaultIntroText }])

    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchBotResponse = async (query, recentISCHOLARQuestion) => {
    const uid = 123;
    if (!uid) return { answer: "No phone number provided" };

    try {
      const response = await fetch("http://localhost:8000/gemini_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          recentISCHOLARQuestion,
          uid,
          conversation: chatLog.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok) return { answer: `Error: ${response.statusText}` };
      
      const data = await response.json();
      return { answer: data.answer || "No response from Gemini" };
    } catch (error) {
      console.error("Failed to fetch Gemini response:", error);
      return { answer: "Error fetching response" };
    }
  };

  const handleSampleQuestion = (question) => {
    setUserInput(question);
  };


  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message
    setChatLog(prev => [...prev, { 
      role: "user", 
      content: userInput 
    }]);


    const recentISCHOLARMessage = [...chatLog]
      .reverse()
      .find(entry => entry.role === "model")?.content;

    if (!recentISCHOLARMessage) return;

    // Get and add bot response
    const response = await fetchBotResponse(userInput, recentISCHOLARMessage);
    setChatLog(prev => [...prev, { 
      role: "model", 
      content: response.answer 
    }]);
    setUserInput("");
  };

  const handleEndConversation = () => {
    navigate('/welcome'); // Updated to useNavigate
  };

  return (
    <div className="chatbot-container">
      <div className="top-bar">
        <span className="timer">
          Time: {Math.floor(time / 60)}:
          {(time % 60).toString().padStart(2, '0')}
        </span>
        <button 
          onClick={handleEndConversation} 
          className="end-button"
        >
          End conversation
        </button>
      </div>

      <h2 className="chatbot-header">Trust Us</h2>
      
      <div className="chat-log">
        {chatLog.map((entry, index) => (
          <div 
            key={index} 
            className={`chat-message ${
              entry.role === 'user' ? 'user-message' : 'bot-message'
            }`}
          >
            <div className="message-bubble">
              <strong>{entry.role}:</strong> {entry.content}
            </div>
          </div>
        ))}
      </div>

      <div className="sample-questions">
          {chatLog.length === 1 && sampleQuestions.map((question, index) => (
            <button
              key={index}
              className="sample-question"
              onClick={() => handleSampleQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button 
          onClick={handleSendMessage} 
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;