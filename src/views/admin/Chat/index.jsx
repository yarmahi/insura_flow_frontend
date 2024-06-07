import React, { useState } from "react";
import { Input, Button, List, Avatar } from "antd";
import "tailwindcss/tailwind.css";

const { TextArea } = Input;

const users = [
  { id: 1, name: "Alice", avatar: "A" },
  { id: 2, name: "Bob", avatar: "B" },
  { id: 3, name: "Charlie", avatar: "C" },
];

const ChatUI = () => {
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleSend = () => {
    if (message.trim() && currentUser) {
      const newMessages = { ...messages };
      if (!newMessages[currentUser.id]) {
        newMessages[currentUser.id] = [];
      }
      newMessages[currentUser.id].push({
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString(),
      });
      setMessages(newMessages);
      setMessage("");

      // Simulate a reply from the bot
      setTimeout(() => {
        const botMessages = { ...newMessages };
        botMessages[currentUser.id].push({
          text: `This is a reply from ${currentUser.name}`,
          sender: "bot",
          time: new Date().toLocaleTimeString(),
        });
        setMessages(botMessages);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/4 bg-white shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Users</h2>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              className={`cursor-pointer p-4 ${
                currentUser && currentUser.id === user.id ? "bg-blue-100" : ""
              }`}
              onClick={() => setCurrentUser(user)}
            >
              <List.Item.Meta
                avatar={<Avatar>{user.avatar}</Avatar>}
                title={user.name}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="flex-1 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-4 overflow-auto bg-gray-100">
          {currentUser ? (
            <List
              itemLayout="horizontal"
              dataSource={messages[currentUser.id] || []}
              renderItem={(item) => (
                <List.Item
                  className={`flex ${
                    item.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`flex items-end ${
                      item.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar>
                      {item.sender === "user" ? "U" : currentUser.avatar}
                    </Avatar>
                    <div
                      className={`ml-2 ${
                        item.sender === "user" ? "mr-2" : "ml-2"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          item.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                      >
                        {item.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {item.time}
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-2">
            <TextArea
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSend}
              className="flex-1 resize-none"
              placeholder="Type a message..."
              disabled={!currentUser}
            />
            <Button type="primary" onClick={handleSend} disabled={!currentUser}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
