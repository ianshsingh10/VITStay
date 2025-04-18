import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, HelpCircle, Home, Calendar, CreditCard, Info } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Hello! I\'m your VITStay assistant. How can I help you today?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat is opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        // Add user message
        const userMessage = {
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse = getBotResponse(inputValue.toLowerCase());
            setMessages(prev => [...prev, {
                type: 'bot',
                content: botResponse,
                timestamp: new Date()
            }]);
        }, 500);
    };

    const getBotResponse = (userInput) => {
        // Simple keyword-based responses
        if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
            return 'Hello! How can I assist you with your hostel needs today?';
        }
        
        if (userInput.includes('room') || userInput.includes('accommodation')) {
            return 'We offer various room types: 1-seater, 2-seater, 3-seater, and 4-seater rooms. You can view 3D models of each room type by going to the "3D Room View" section.';
        }
        
        if (userInput.includes('fee') || userInput.includes('cost') || userInput.includes('price')) {
            return 'Hostel fees vary by room type. You can find detailed fee information in the "Hostel Fee Structure" section.';
        }
        
        if (userInput.includes('book') || userInput.includes('reserve') || userInput.includes('apply')) {
            return 'To book a room, please select a hostel block and room type from the "Book Room" section. Make sure you\'re logged in to complete the booking process.';
        }
        
        if (userInput.includes('complaint') || userInput.includes('issue') || userInput.includes('problem')) {
            return 'If you have any complaints or issues, please use the "Complaint" section to submit them. Our team will address them promptly.';
        }
        
        if (userInput.includes('warden') || userInput.includes('contact')) {
            return 'You can find contact information for hostel wardens in the "Warden Details" section.';
        }
        
        if (userInput.includes('thank')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        }
        
        if (userInput.includes('bye') || userInput.includes('goodbye')) {
            return 'Goodbye! Have a great day!';
        }
        
        // Default response for unrecognized queries
        return 'I\'m not sure I understand. You can ask me about room types, booking process, fees, complaints, or warden details.';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const quickReplies = [
        { text: 'Room Types', icon: <Home size={16} /> },
        { text: 'Booking Process', icon: <Calendar size={16} /> },
        { text: 'Fee Structure', icon: <CreditCard size={16} /> },
        { text: 'How to Complain', icon: <Info size={16} /> }
    ];

    const handleQuickReply = (text) => {
        setInputValue(text);
        setTimeout(() => {
            handleSendMessage();
        }, 100);
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
                className="fixed bottom-6 right-6 bg-[#2B4B7E] text-white p-4 rounded-full shadow-lg z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="bg-[#2B4B7E] text-white p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <MessageSquare size={20} className="mr-2" />
                                <h3 className="font-semibold">VITStay Assistant</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Quick Replies */}
                        <div className="p-2 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply.text)}
                                    className="flex items-center gap-1 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                                >
                                    {reply.icon}
                                    <span>{reply.text}</span>
                                </button>
                            ))}
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg ${
                                            message.type === 'user'
                                                ? 'bg-[#2B4B7E] text-white rounded-br-none'
                                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                        }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-xs opacity-70 mt-1 text-right">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-gray-200">
                            <div className="flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#2B4B7E] focus:border-transparent"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-[#2B4B7E] text-white p-2 rounded-r-lg hover:bg-[#1a3a6d] transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;