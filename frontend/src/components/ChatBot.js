// src/components/ChatBot.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ChatBot.css';
import axios from 'axios';
import ReactMarkDown from 'react-markdown'
import { TypeAnimation } from 'react-type-animation';

const defaultIntroText = `We are the iBot, your application assistant. How can I help you?`;
const sampleQuestions = [
  "Can you tell me about the scholarship requirements?",
  "What documents do I need to submit?"
];

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [time, setTime] = useState(0);
  const navigate = useNavigate();
  const urlOutsideSearchString = window.location.search;
  const paramsOutside = new URLSearchParams(urlOutsideSearchString);
  const scholarship_name= paramsOutside.get("scholarship_name")
  useEffect(() => {
    // Initialize chat with a single bot message
    setChatLog([{ role: 'model', content: defaultIntroText }]);
    // Simple timer to track chat duration
    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock fetch function to simulate your Gemini/bot endpoint
  const fetchBotResponse = async (query, recentISCHOLARQuestion) => {
    const uid = sessionStorage.getItem('uid', "123");
    const scholarshipId = sessionStorage.getItem('scholarshipId', "123");

    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const scholarship_id = params.get("scholarshipId")
    const scholarship_name= params.get("scholarship_name")

    const url = "http://localhost:5001/bisonhack-9f9a6/us-central1/aihelp";
    const userId = "4auyMYAj7QSYuLlLRppHtGvSkoj1" // Fallback for user ID if not logged in

    const form = new FormData();
    form.append("uid", userId)
    form.append("scholarship_id", scholarship_id)
    form.append("conversations", JSON.stringify(chatLog))

    const answer = await axios.post(url, form).then(data => {

      const response = data.data.response
      console.log(data.data.response)
      return { answer: response || "No Response from Gemini" }

    }
    )
    return answer


    // try {
    //   const response = await fetch("http://localhost:8000/gemini_response", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       query,
    //       recentISCHOLARQuestion,
    //       uid,
    //       conversation: chatLog.map(({ role, content }) => ({ role, content }))
    //     })
    //   });

    //   if (!response.ok) return { answer: `Error: ${response.statusText}` };

    //   const data = await response.json();
    //   return { answer: data.answer || "No response from Gemini" };
    // } catch (error) {
    //   console.error("Failed to fetch Gemini response:", error);
    //   return { answer: "Error fetching response" };
    // }
  };

  // Place sample question into input
  const handleSampleQuestion = (question) => {
    setUserInput(question);
  };

  // Send the user's message and fetch bot response
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // 1) Add the user's message
    setChatLog(prev => [...prev, { role: "user", content: userInput }]);

    // 2) Find the last iBot message to pass along
    const recentISCHOLARMessage = [...chatLog]
      .reverse()
      .find(entry => entry.role === "model")?.content;

    if (!recentISCHOLARMessage) return;

    // 3) Fetch bot response
    const response = await fetchBotResponse(userInput, recentISCHOLARMessage);
    // 4) Add bot's reply to the log
    setChatLog(prev => [...prev, { role: "model", content: response.answer }]);
    setUserInput("");
  };

  const handleEndConversation = () => {
    navigate('/welcome');
  };

  return (
    <div className="chatbot-container">
      {/* Heading outside or above the main box */}
      <h3 className="chatbot-header">{scholarship_name} Coach</h3>

      {/* Single unified "card" that holds everything */}
      <div className="chatbot-card">
        <div className="top-bar">
          <span className="timer">
            Time: {Math.floor(time / 60)}:
            {(time % 60).toString().padStart(2, '0')}
          </span>
          <button onClick={handleEndConversation} className="end-button">
            End conversation
          </button>
        </div>

        <div className="chat-log">
          {chatLog.map((entry, index) => (
            <div
              key={index}
              className={`chat-message ${entry.role === 'user' ? 'user-message' : 'bot-message'
                }`}
            >
              <div className="message-bubble" flex>
                <strong>{ entry.role === "model"? "iBot"  : "User"}:</strong> <ReactMarkDown>{entry.content}</ReactMarkDown>
              </div>
            </div>
          ))}
        </div>

        {chatLog.length === 1 && (
          <div className="sample-questions">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                className="sample-question"
                onClick={() => handleSampleQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../ChatBot.css';

// const defaultIntroText = `We are the application bot`;
// const sampleQuestions = [
//   "Can you tell me about the scholarship requirements?",
//   "What documents do I need to submit?"
// ];

// const ChatBot = () => {
//   const [userInput, setUserInput] = useState('');
//   const [chatLog, setChatLog] = useState([]);
//   const [time, setTime] = useState(0);
//   const navigate = useNavigate(); // Changed from useRouter to useNavigate

//   useEffect(() => {
//     setChatLog([{ role: 'iBot', content: defaultIntroText }])

//     const timer = setInterval(() => setTime(prev => prev + 1), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const fetchBotResponse = async (query, recentISCHOLARQuestion) => {

//     const uid = sessionStorage.getItem('uid',"123");
//     const scholarshipId = sessionStorage.getItem('scholarshipId',"123");

//     try {
//       const response = await fetch("http://localhost:8000/gemini_response", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query,
//           recentISCHOLARQuestion,
//           uid,
//           conversation: chatLog.map(({ role, content }) => ({ role, content }))
//         })
//       });

//       if (!response.ok) return { answer: `Error: ${response.statusText}` };

//       const data = await response.json();
//       return { answer: data.answer || "No response from Gemini" };
//     } catch (error) {
//       console.error("Failed to fetch Gemini response:", error);
//       return { answer: "Error fetching response" };
//     }
//   };

//   const handleSampleQuestion = (question) => {
//     setUserInput(question);
//   };


//   const handleSendMessage = async () => {
//     if (!userInput.trim()) return;

//     // Add user message
//     setChatLog(prev => [...prev, { 
//       role: "user", 
//       content: userInput 
//     }]);


//     const recentISCHOLARMessage = [...chatLog]
//       .reverse()
//       .find(entry => entry.role === "iBot")?.content;

//     if (!recentISCHOLARMessage) return;

//     // Get and add bot response
//     const response = await fetchBotResponse(userInput, recentISCHOLARMessage);
//     setChatLog(prev => [...prev, { 
//       role: "iBot", 
//       content: response.answer 
//     }]);
//     setUserInput("");
//   };

//   const handleEndConversation = () => {
//     navigate('/welcome'); // Updated to useNavigate
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="top-bar">
//         <span className="timer">
//           Time: {Math.floor(time / 60)}:
//           {(time % 60).toString().padStart(2, '0')}
//         </span>
//         <button 
//           onClick={handleEndConversation} 
//           className="end-button"
//         >
//           End conversation
//         </button>
//       </div>

//       <h2 className="chatbot-header">Trust Us</h2>

//       <div className="chat-log">
//         {chatLog.map((entry, index) => (
//           <div 
//             key={index} 
//             className={`chat-message ${
//               entry.role === 'user' ? 'user-message' : 'bot-message'
//             }`}
//           >
//             <div className="message-bubble">
//               <strong>{entry.role}:</strong> {entry.content}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="sample-questions">
//           {chatLog.length === 1 && sampleQuestions.map((question, index) => (
//             <button
//               key={index}
//               className="sample-question"
//               onClick={() => handleSampleQuestion(question)}
//             >
//               {question}
//             </button>
//           ))}
//         </div>

//       <div className="chat-input-container">
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//           placeholder="Type your message..."
//           className="chat-input"
//         />
//         <button 
//           onClick={handleSendMessage} 
//           className="send-button"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
