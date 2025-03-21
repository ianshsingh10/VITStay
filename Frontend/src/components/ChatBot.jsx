import React, { useState } from 'react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Hello! Welcome to VIT Bhopal Hostel Support. How can I help you today?",
            sender: "bot"
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    // Predefined responses for common questions
    const predefinedResponses = {
        'hostel fee': 'The hostel fee varies based on room type. Single AC rooms cost ₹1,85,000, while Non-AC rooms range from ₹1,25,000 to ₹1,45,000 per year.',
        'room types': 'We offer Single, Double, Triple, and Four-seater rooms in both AC and Non-AC variants.',
        'mess': 'The mess facility is compulsory for all hostel residents. The mess fee is included in the hostel charges.',
        'counselling': 'Hostel counselling process involves selecting your preferred room type in order of priority. Please check the instructions page for detailed information.',
        'contact': 'For queries, please contact the Chief Warden Office at +91-XXX-XXXXXXX or email at hostelsupport@vitbhopal.ac.in',
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: inputMessage, sender: "user" }];
        setMessages(newMessages);
        setInputMessage('');

        // Check for predefined responses
        const lowerCaseInput = inputMessage.toLowerCase();
        let botResponse = "I apologize, but I don't have specific information about that. Please contact the hostel office for more details.";

        // Check if the input contains any keywords from predefined responses
        for (const [keyword, response] of Object.entries(predefinedResponses)) {
            if (lowerCaseInput.includes(keyword)) {
                botResponse = response;
                break;
            }
        }

        // Add bot response after a small delay
        setTimeout(() => {
            setMessages([...newMessages, {
                text: botResponse,
                sender: "bot"
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#2B4B7E] text-white rounded-full p-4 shadow-lg hover:bg-[#1a3a6d] transition-colors"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="bg-[#2B4B7E] text-white p-4 rounded-t-lg">
                        <h3 className="font-semibold">VIT Bhopal Hostel Support</h3>
                        <p className="text-sm opacity-75">Ask us anything about hostels</p>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        message.sender === 'user'
                                            ? 'bg-[#2B4B7E] text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Suggestion Chips */}
                    <div className="px-4 py-2 border-t border-gray-200">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <button 
                                onClick={() => setInputMessage("What are the hostel fees?")}
                                className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                            >
                                Hostel Fees
                            </button>
                            <button 
                                onClick={() => setInputMessage("What room types are available?")}
                                className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                            >
                                Room Types
                            </button>
                            <button 
                                onClick={() => setInputMessage("Tell me about mess facility")}
                                className="whitespace-nowrap px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                            >
                                Mess Facility
                            </button>
                        </div>
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#2B4B7E]"
                            />
                            <button
                                type="submit"
                                className="bg-[#2B4B7E] text-white px-4 py-2 rounded-lg hover:bg-[#1a3a6d] transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;