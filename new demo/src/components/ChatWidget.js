"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Plus,
  Trash2,
  Copy,
  Check,
  ArrowLeft,
  Send,
} from "lucide-react";
import styles from "@/styles/modules/ChatWidget.module.scss";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessagesList, setShowMessagesList] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Initialize with default conversations
  useEffect(() => {
    const savedConversations = localStorage.getItem("chatbot-conversations");
    const savedActiveId = localStorage.getItem("chatbot-active-id");

    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      setConversations(parsed);

      if (savedActiveId && parsed.find((c) => c.id === savedActiveId)) {
        setActiveConversationId(savedActiveId);
      } else if (parsed.length > 0) {
        setActiveConversationId(parsed[0].id);
      }
    } else {
      // Create sample conversations
      const sampleConversations = createSampleConversations();
      setConversations(sampleConversations);
      setActiveConversationId(sampleConversations[0].id);
    }
  }, []);

  // Save to localStorage whenever conversations change
  useEffect(() => {
    if (conversations.length > 0) {
      try {
        const data = JSON.stringify(conversations);
        localStorage.setItem("chatbot-conversations", data);
      } catch (error) {
        console.error("Failed to save conversations:", error);
      }
    }
  }, [conversations]);

  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem("chatbot-active-id", activeConversationId);
    }
  }, [activeConversationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [conversations, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  // Toast functionality
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createSampleConversations = () => {
    const avatars = ["👨‍💻", "👩‍💼", "👨‍🎨", "👩‍🔬", "👨‍🏫"];
    const names = ["Evol"];
    const sampleMessages = ["Rate your conversation"];
    const timeAgo = [Date.now()];

    return names.map((name, index) => {
      const id = `conv_${Date.now()}_${index}`;
      return {
        id,
        title: name,
        avatar: avatars[index],
        lastMessage: sampleMessages[index],
        timeAgo: timeAgo[index],
        messages: [
          {
            id: `msg_${Date.now()}_${index}`,
            role: "assistant",
            content: sampleMessages[index],
            timestamp: Date.now() - index * 86400000,
          },
        ],
        createdAt: Date.now() - index * 86400000,
      };
    });
  };

  const createNewConversation = () => {
    const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      id,
      title: "New Chat",
      avatar: "🤖",
      messages: [
        {
          id: `msg_${Date.now()}`,
          role: "assistant",
          content:
            "Hello! 👋 Please briefly describe your issue so we can help you better.",
          timestamp: Date.now(),
        },
      ],
      createdAt: Date.now(),
      lastMessage:
        "Hello! 👋 Please briefly describe your issue so we can help you better.",
      timeAgo: Date.now(),
    };
  };

  const getCurrentConversation = () => {
    return conversations.find((c) => c.id === activeConversationId);
  };

  const updateConversation = (updatedConversation) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === updatedConversation.id ? updatedConversation : c
      )
    );
  };

  const generateTitle = (firstUserMessage) => {
    return firstUserMessage.length > 30
      ? firstUserMessage.substring(0, 30) + "..."
      : firstUserMessage;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const currentConv = getCurrentConversation();
    if (!currentConv) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    let updatedConv = {
      ...currentConv,
      messages: [...currentConv.messages, userMessage],
      lastMessage: input.trim(),
      timeAgo: Date.now(),
    };

    if (!currentConv.messages.some((m) => m.role === "user")) {
      updatedConv.title = input.trim().slice(0, 30) + "...";
    }

    updateConversation(updatedConv);
    setInput("");
    setIsLoading(true);
    console.log(updatedConv.messages);
    const messages = updatedConv.messages;

    // Get the last 3 messages or all if fewer than 3
    const lastMessages = messages.length <= 3 ? messages : messages.slice(-3);

    // Extract only `content` and `role`
    const lastThreeMessage = lastMessages.map(({ content, role }) => ({
      content,
      role,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: lastThreeMessage }),
      });
      const data = await response.json();

      const assistantMessage = {
        id: `msg_${Date.now()}`,
        role: "assistant",
        content: data.reply || "Sorry, I couldn't get a response.",
        timestamp: Date.now(),
      };

      updatedConv = {
        ...updatedConv,
        messages: [...updatedConv.messages, assistantMessage],
        lastMessage: assistantMessage.content,
        timeAgo: Date.now(),
      };

      updateConversation(updatedConv);
    } catch (err) {
      showToast("⚠️ Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const createNewChat = () => {
    const newConv = createNewConversation();
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setShowMessagesList(false);
  };

  const selectConversation = (convId) => {
    setActiveConversationId(convId);
    setShowMessagesList(false);
  };

  const deleteConversation = (convId) => {
    if (conversations.length === 1) {
      showToast("Cannot delete the last conversation");
      return;
    }

    setConversations((prev) => prev.filter((c) => c.id !== convId));

    if (activeConversationId === convId) {
      const remaining = conversations.filter((c) => c.id !== convId);
      setActiveConversationId(remaining[0]?.id || "");
    }

    showToast("Conversation deleted");
  };

  const copyMessage = async (message) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedMessageId(message.id);
      showToast("Message copied to clipboard");
      setTimeout(() => setCopiedMessageId(""), 2000);
    } catch (error) {
      showToast("Failed to copy message");
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  const currentConversation = getCurrentConversation();

  return (
    <>
      {/* Toast */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={styles.chatWidgetButton}
        aria-label="Open Chat"
      >
        <MessageCircle className={styles.icon} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWidgetOverlay}>
          <div className={styles.chatWidgetContainer}>
            {/* Messages List View */}
            {showMessagesList ? (
              <>
                {/* Header */}
                <div className={styles.chatWidgetHeader}>
                  <h2>Messages</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={styles.closeButton}
                  >
                    <X className={styles.icon} />
                  </button>
                </div>

                {/* Conversations List */}
                <div className={styles.conversationsList}>
                  {conversations?.map((conv) => (
                    <div
                      key={conv.id}
                      className={styles.conversationItem}
                      onClick={() => selectConversation(conv.id)}
                    >
                      <div className={styles.conversationAvatar}>
                        {conv?.avatar || conv?.title?.charAt(0)}
                      </div>
                      <div className={styles.conversationDetails}>
                        <div className={styles.conversationTitle}>
                          <h3>{conv?.title}</h3>
                          <span>{getTimeAgo(conv?.timeAgo)}</span>
                        </div>
                        <p className={styles.conversationLastMessage}>
                          {generateTitle(conv?.lastMessage) ||
                            "No messages yet"}
                        </p>
                      </div>
                      {/* <div className={styles.conversationArrow}>
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div> */}
                      <button
                        className={styles.trashButton}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent triggering selectConversation
                          deleteConversation(conv.id);
                        }}
                        aria-label="Delete conversation"
                      >
                        <Trash2 className={styles.icon} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Send Message Section */}
                <div className={styles.sendMessageSection}>
                  <button
                    onClick={createNewChat}
                    className={styles.sendMessageButton}
                  >
                    <span>Send us a message</span>
                    <Send className={styles.icon} />
                  </button>
                </div>

                {/* Bottom Navigation */}
                <div className={styles.bottomNavigation}>
                  <div className={styles.navButtons}>
                    <button className={`${styles.navButton} ${styles.active}`}>
                      <MessageCircle className={styles.icon} />
                      <span>Messages</span>
                      <div className={styles.badge}>
                        {conversations?.length}
                      </div>
                    </button>
                    <button
                      onClick={createNewChat}
                      className={styles.navButton}
                    >
                      <Plus className={styles.icon} />
                      <span>New Chat</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Chat Interface */
              <>
                {/* Chat Header */}
                <div className={styles.chatHeader}>
                  <button
                    onClick={() => setShowMessagesList(true)}
                    className={styles.backButton}
                  >
                    <ArrowLeft className={styles.icon} />
                  </button>
                  <div className={styles.chatAvatar}>
                    {currentConversation?.avatar ||
                      currentConversation?.title.charAt(0)}
                  </div>
                  <div className={styles.chatInfo}>
                    <h3>{currentConversation?.title}</h3>
                    <p>The team can also help</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={styles.closeButton}
                  >
                    <X className={styles.icon} />
                  </button>
                </div>

                {/* Messages */}
                <div className={styles.messagesContainer}>
                  {currentConversation?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`${styles.messageWrapper} ${
                        styles[message.role]
                      }`}
                    >
                      <div
                        className={`${styles.messageBubble} ${
                          styles[message.role]
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className={styles.assistantHeader}>
                            <div className={styles.assistantAvatar}>
                              {currentConversation?.avatar ||
                                currentConversation?.title.charAt(0)}
                            </div>
                            <span>{currentConversation?.title}</span>
                          </div>
                        )}
                        <p>{message.content}</p>
                        <button
                          className={styles.copyButton}
                          onClick={() => copyMessage(message)}
                        >
                          {copiedMessageId === message.id ? (
                            <Check className={styles.icon} />
                          ) : (
                            <Copy className={styles.icon} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className={styles.loadingMessage}>
                      <div className={styles.loadingDots}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className={styles.inputArea}>
                  <div className={styles.inputWrapper}>
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className={styles.textInput}
                      disabled={isLoading}
                      rows={1}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                      className={styles.sendButton}
                    >
                      <Send className={styles.icon} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
