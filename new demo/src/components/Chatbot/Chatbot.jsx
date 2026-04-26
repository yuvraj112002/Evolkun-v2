"use client";
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic,
  MicOff,
  X, 
  Send, 
  Sparkles,
  Square
} from 'lucide-react';
import styles from './Chatbot.module.scss';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';

// Groq API configuration
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || 'your-groq-api-key-here';

const SYSTEM_PROMPT = `
You are “EvolkAI”, the official AI assistant for the Evolkun Digital Agency website.

You are NOT a general chatbot.
You exist ONLY to help users understand, navigate, and take action on the Evolkun website.

You must behave like a calm, intelligent, professional digital-agency consultant.

────────────────────────────────
CORE IDENTITY & SCOPE
────────────────────────────────

• Website name: Evolkun
• Business type: Digital Agency
• Core services:
  – Web Development
  – App Development
  – Branding
  – UI/UX
  – AI-assisted digital solutions
• Pricing model: Quote-based via interactive survey
• Primary conversion: “Get Free Quote Instantly” → Survey Page

You must ONLY answer questions related to:
• Evolkun
• Its services
• Its pages
• Its process
• Its pricing logic
• Its portfolio and work
• Contact, signup, signin, pricing, and survey flow

If the user asks anything unrelated (general knowledge, coding help, personal questions, other companies):
→ Politely redirect back to Evolkun or suggest contacting the team.

────────────────────────────────
PAGE-AWARE BEHAVIOR (VERY IMPORTANT)
────────────────────────────────

You will ALWAYS receive the current page path.

Use it to adapt your response.

PAGE MAP (from the real project):

/                     → Home page
/web-development      → Web Development service
/app-development      → App Development service
/branding             → Branding service
/pricing              → Pricing overview
/survey-page          → AI quotation survey
/comming-soon         → Feature not live yet
/signup               → User registration
/signin               → User login
/profile              → User account
/terms-condition      → Legal terms
/portfolio            -> Portfolio

RULES:
• If user is on a service page → explain ONLY that service in depth
• If user is on pricing → explain survey-based pricing logic
• If user is on survey page → guide them step-by-step
• If user is on auth pages → explain what they can do there
• Never talk about pages that don’t exist

────────────────────────────────
SURVEY & PRICING INTELLIGENCE
────────────────────────────────

You understand that:
• Pricing is calculated using an internal scoring system
• Each question has:
  – Base score (minimum complexity cost)
  – Option scores (feature complexity)
• Higher complexity → higher quote
• The survey is NOT random — it is structured and weighted

If user asks:
• “How much will my project cost?”
→ Explain that cost depends on:
  – Business type
  – Features
  – Platform
  – Scope
  – Complexity
→ Encourage completing the survey for accuracy

Never invent exact prices.

────────────────────────────────
NAVIGATION & ACTION GUIDANCE
────────────────────────────────

You are allowed to guide users to actions:

• “You can start by clicking **Get Free Quote Instantly**”
• “Open the Web Development page to see details”
• “Go to the Survey page to generate a quote”
• “Sign up to save your project details”
• “Sign in to continue your survey”

You do NOT fabricate links.
You refer only to real pages.

────────────────────────────────
CONVERSATION STYLE
────────────────────────────────

Tone:
• Calm
• Confident
• Minimal
• Professional
• Human-like

Rules:
• Short answers (2–5 sentences)
• Ask ONE clarifying question at a time
• No emojis
• No hype language
• No filler

────────────────────────────────
INTENT HANDLING
────────────────────────────────

Detect intent and respond accordingly:

• Service inquiry → Explain + suggest relevant page
• Pricing → Explain survey logic
• Quote → Push survey page
• Portfolio / work → Explain type of projects
• Login / signup → Explain purpose
• Confusion → Simplify and guide
• Comparison → Keep it Evolkun-focused only

────────────────────────────────
SAFETY & HONESTY
────────────────────────────────

• If unsure → say:
  “For exact details, our team will assist you.”
• Never hallucinate:
  – Clients
  – Prices
  – Guarantees
• Never claim features not visible on the site

────────────────────────────────
EXAMPLES (REALISTIC)
────────────────────────────────

User: “I’m on the web development page. What do you offer?”
Assistant:
“We build scalable, performance-focused websites tailored to business needs. If you want a cost estimate, the fastest way is our survey, which adapts pricing based on your requirements.”

User: “How much will my app cost?”
Assistant:
“App pricing depends on features, platform, and complexity. Our AI-powered survey calculates this accurately. Would you like to start it now?”

User: “How do I contact you?”
Assistant:
“You can proceed through the survey for a quote or sign up to manage your project. If you prefer, our team will reach out after submission.”

────────────────────────────────
FINAL RULE
────────────────────────────────

Your goal is to:
• Reduce confusion
• Guide users
• Increase clarity
• Convert visitors into qualified leads

You are Evolkun’s on-site AI assistant — nothing more, nothing less.
`;

// Context-aware responses based on current page
const getPageContext = (pathname) => {
  const contexts = {
    '/': {
      page: 'Home',
      context: 'main website',
      suggestions: [
        'What services do you offer?',
        'Show me your portfolio',
        'Estimate my project cost',
        'Book a consultation call'
      ]
    },
    '/services': {
      page: 'Services',
      context: 'services page',
      suggestions: [
        'Tell me about web development',
        'What AI solutions do you provide?',
        'Estimate project timeline',
        'See case studies'
      ]
    },
    '/portfolio': {
      page: 'Portfolio',
      context: 'portfolio page',
      suggestions: [
        'Show similar projects',
        'What tech stack was used?',
        'Request a quote',
        'Schedule a call'
      ]
    },
    '/about': {
      page: 'About',
      context: 'about page',
      suggestions: [
        'Tell me about your process',
        'What makes Evolkun different?',
        'Meet the team',
        'Book a discovery call'
      ]
    }
  };

  return contexts[pathname] || contexts['/'];
};

// Streaming Groq API call function
const getGroqStreamingResponse = async (userMessage, conversationHistory = [], onChunk) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...conversationHistory,
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error('Groq API request failed');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content || '';
            if (content) {
              fullResponse += content;
              onChunk(fullResponse);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }

    return fullResponse;
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const chatPanelRef = useRef(null);
  const pathname = usePathname();
  const pageContext = getPageContext(pathname);

  // Voice recognition hook
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupported
  } = useSpeechRecognition();

  // Prevent body scroll when cursor is over chat panel - STRICT MODE
  useEffect(() => {
    if (!isOpen) return;

    const chatPanel = chatPanelRef.current;
    const messagesContainer = messagesContainerRef.current;
    if (!chatPanel) return;

    const handleMouseEnter = () => {
      // Prevent body scroll completely when cursor is over chatbot
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    };

    const handleMouseLeave = () => {
      // Restore body scroll when cursor leaves chatbot
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };

    // Prevent all wheel events from propagating to the page
    const handleWheel = (e) => {
      e.stopPropagation();
      
      if (!messagesContainer) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
      const isScrollable = scrollHeight > clientHeight;
      
      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      
      // Prevent scroll bounce at boundaries
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
        return;
      }
    };

    chatPanel.addEventListener('mouseenter', handleMouseEnter);
    chatPanel.addEventListener('mouseleave', handleMouseLeave);
    chatPanel.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      chatPanel.removeEventListener('mouseenter', handleMouseEnter);
      chatPanel.removeEventListener('mouseleave', handleMouseLeave);
      chatPanel.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Mobile: prevent body scroll when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const greeting = {
          type: 'bot',
          text: `Welcome to Evolkun! 👋\n\nI'm your AI assistant, here to help you build amazing digital experiences.\n\nHow can I help you today?`,
          quickActions: pageContext.suggestions,
          timestamp: new Date()
        };
        setMessages([greeting]);
      }, 300);
    }
  }, [isOpen, browserSupported]);

  // Update input when voice transcript changes
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageText = inputValue) => {
    if (!messageText.trim() || isStreaming) return;

    // Reset voice recognition
    if (isListening) {
      stopListening();
    }
    resetTranscript();

    // Add user message
    const userMessage = {
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Update conversation history
    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: messageText }
    ];

    // Add placeholder for bot response
    const botMessageIndex = messages.length + 1;
    setMessages(prev => [...prev, {
      type: 'bot',
      text: '',
      quickActions: [],
      timestamp: new Date(),
      isStreaming: true
    }]);
    setStreamingMessageIndex(botMessageIndex);
    setIsTyping(false);
    setIsStreaming(true);

    try {
      // Get streaming AI response from Groq
      const fullResponse = await getGroqStreamingResponse(
        messageText, 
        conversationHistory,
        (partialResponse) => {
          // Update the streaming message in real-time
          setMessages(prev => {
            const updated = [...prev];
            updated[botMessageIndex] = {
              type: 'bot',
              text: partialResponse,
              quickActions: [],
              timestamp: new Date(),
              isStreaming: true
            };
            return updated;
          });
        }
      );

      // Finalize the message
      setMessages(prev => {
        const updated = [...prev];
        updated[botMessageIndex] = {
          type: 'bot',
          text: fullResponse,
          quickActions: pageContext.suggestions.slice(0, 3),
          timestamp: new Date(),
          isStreaming: false
        };
        return updated;
      });

      setConversationHistory([
        ...newHistory,
        { role: 'assistant', content: fullResponse }
      ]);

    } catch (error) {
      // Handle error
      setMessages(prev => {
        const updated = [...prev];
        updated[botMessageIndex] = {
          type: 'bot',
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or contact our team directly.",
          quickActions: ['Try Again', 'Contact Support'],
          timestamp: new Date(),
          isStreaming: false
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setStreamingMessageIndex(null);
    }
  };

  const handleStopStreaming = () => {
    setIsStreaming(false);
    setStreamingMessageIndex(null);
  };

  const handleQuickAction = (action) => {
    if (action === 'Try Again' && messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.type === 'user');
      if (lastUserMessage) {
        handleSend(lastUserMessage.text);
      }
    } else {
      handleSend(action);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <>
      {/* Floating Voice Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={styles.voiceChatButton}
            aria-label="Open voice chat"
          >
            <div className={styles.voiceIconWrapper}>
              {/* Option 1: Use custom image - Replace '/path/to/your/icon.png' with your icon path */}
              /<img src="/astronaut.png" alt="Chat Icon" className={styles.voiceIcon} />
              
              {/* Option 2: Use Lucide React icon (default) */}
              <Mic size={20} strokeWidth={2} className={styles.micIcon} />
            </div>
            <span className={styles.voiceChatText}>EvolkAI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatPanelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={styles.chatPanel}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>
                    <Sparkles size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.statusIndicator} />
                </div>
                <div className={styles.headerText}>
                  <h3>Evolkun Assistant</h3>
                  <p>
                    {isStreaming ? 'Thinking...' : 'Powered by EvolkAI • Always available'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                aria-label="Close chat"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div 
              className={styles.messagesContainer}
              ref={messagesContainerRef}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${styles.message} ${styles[message.type]}`}
                >
                  {message.type === 'bot' && (
                    <div className={styles.botAvatar}>
                      <Sparkles size={14} />
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>
                      {message.text}
                      {message.isStreaming && (
                        <motion.span
                          className={styles.cursor}
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          ▊
                        </motion.span>
                      )}
                    </div>
                    {message.quickActions && message.quickActions.length > 0 && !message.isStreaming && (
                      <div className={styles.quickActions}>
                        {message.quickActions.map((action, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleQuickAction(action)}
                            className={styles.quickActionButton}
                          >
                            {action}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${styles.message} ${styles.bot}`}
                >
                  <div className={styles.botAvatar}>
                    <Sparkles size={14} />
                  </div>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.inputContainer}>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.listeningIndicator}
                >
                  <div className={styles.waveformContainer}>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={styles.waveformBar}
                        animate={{
                          scaleY: [1, 1.5, 1, 1.8, 1, 1.3, 1]
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                  <span className={styles.listeningText}>Listening...</span>
                </motion.div>
              )}
              
              <div className={styles.inputWrapper}>
                {browserSupported && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleVoiceInput}
                    className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                    disabled={isStreaming}
                  >
                    {isListening ? (
                      <MicOff size={18} />
                    ) : (
                      <Mic size={18} />
                    )}
                  </motion.button>
                )}
                
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Speak now..." : "Ask about services, pricing, or timeline..."}
                  className={styles.input}
                  disabled={isStreaming}
                />
                
                {isStreaming ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStopStreaming}
                    className={styles.stopButton}
                    aria-label="Stop generating"
                  >
                    <Square size={18} fill="currentColor" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim()}
                    className={styles.sendButton}
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </motion.button>
                )}
              </div>
              
              <p className={styles.disclaimer}>
                EvolkAI – Your Smart Assistant• {browserSupported ? 'Voice & text input available' : 'Responses may vary'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}