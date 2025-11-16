"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your NexEvent assistant. Ask me anything about our events!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't process that. Please try again.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out z-50 flex items-center justify-center  hover:animate-none"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:right-6 md:left-auto w-auto md:w-96 h-[80vh] md:h-[500px] bg-dark-100 border border-white/20 rounded-lg shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue" />
              <h3 className="font-semibold text-white">NexEvent Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-light-200 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95 rounded-full p-1 transition-all duration-200"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 message-thread">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-white text-black"
                      : "bg-dark-200 text-light-100"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-200 text-light-100 rounded-lg p-3">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about events..."
                className="flex-1 bg-dark-200 text-white rounded-lg px-4 py-2 text-sm focus:outline-none placeholder:text-light-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={isLoading}
                aria-label="Send message"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#7c3aed] text-white hover:bg-[#6d28d9] hover:scale-105 active:scale-95 disabled:bg-gray-600 disabled:text-gray-400 disabled:hover:scale-100 disabled:cursor-not-allowed rounded-lg px-4 py-2 transition-all duration-200 font-semibold"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
