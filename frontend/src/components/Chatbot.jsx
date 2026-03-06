import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi 👋 I’m Travelify AI. How can I help you plan your trip today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: userText,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
                   bg-gradient-to-tr from-indigo-600 to-indigo-500
                   text-white text-2xl shadow-xl hover:scale-105
                   transition z-[9999]"
      >
        🤖
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 md:w-96 bg-white
                     rounded-3xl shadow-2xl z-[9999]
                     animate-chat-open overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 
                          text-white px-5 py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Travelify AI</p>
              <p className="text-xs text-indigo-100">Online • Instant replies</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* MESSAGES */}
          <div className="h-72 p-4 space-y-3 overflow-y-auto text-sm bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-4 py-2 rounded-2xl leading-relaxed ${
                  m.from === "bot"
                    ? "bg-white text-gray-800 shadow"
                    : "bg-indigo-600 text-white ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="bg-white px-4 py-2 rounded-2xl shadow text-gray-400 text-xs w-fit">
                AI is typing<span className="animate-pulse">...</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="flex items-center gap-2 border-t p-3 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about trips, hotels, budget..."
              className="flex-1 px-4 py-2 text-sm rounded-full bg-gray-100
                         outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-full bg-indigo-600
                         text-white text-sm hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        .animate-chat-open {
          animation: chatOpen 0.25s ease-out;
        }
        @keyframes chatOpen {
          from {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
