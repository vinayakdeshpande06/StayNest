import React, { useState, useEffect, useRef } from 'react';
import './ChatAssistant.css';
import api from '../api';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([
        { role: 'bot', content: 'Hi! I am Ask Vin, your StayNest assistant. How can I help you today?' }
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chat]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsg = { role: 'user', content: message };
        setChat([...chat, userMsg]);
        setMessage('');
        setLoading(true);

        try {
            const response = await api.get(`/ai-service/ai/chat?message=${encodeURIComponent(message)}`);
            const botMsg = { role: 'bot', content: response.data };
            setChat(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            setChat(prev => [...prev, { role: 'bot', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-widget-container">
            {!isOpen && (
                <button className="chat-button" onClick={() => setIsOpen(true)}>
                    <i className="fas fa-comment-dots" style={{fontSize: '24px'}}></i>
                    <span>Ask Vin</span>
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Ask Vin</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
                    </div>
                    
                    <div className="chat-messages" ref={scrollRef}>
                        {chat.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                        {loading && <div className="message bot">Thinking...</div>}
                    </div>

                    <div className="chat-input-area">
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                        />
                        <button onClick={handleSend} disabled={loading || !message.trim()}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;
