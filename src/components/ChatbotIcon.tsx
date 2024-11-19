import React from "react";
import Link from "next/link";

const ChatbotIcon: React.FC = () => {
  return (
    <Link href="/chatbot">
      <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-colors">
        <img src="/icons/Chatbot.png" alt="Chatbot Icon" className="w-6 h-6" />
      </div>
    </Link>
  );
};

export default ChatbotIcon;
