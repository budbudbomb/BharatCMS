import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';
import { MessageSquare, X, Send } from 'lucide-react';

export const Chatbot: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
        { role: 'bot', text: 'Hello! I am your secure government assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            // In a real app, we would fetch from our API
            // const response = await fetch('http://localhost:5000/api/ai/query', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json', 'X-Tenant-Id': 'current-tenant' },
            //     body: JSON.stringify(userMsg)
            // });
            // const data = await response.json();
            
            // Simulating API response
            await TaskDelay(1000);
            const botResponse = userMsg.toLowerCase().includes('hello') 
                ? 'Greetings! I am ready to assist with your department-specific queries.' 
                : 'Information not available...';

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting to the secure gateway.' }]);
        } finally {
            setLoading(false);
        }
    };

    // Helper for simulation
    function TaskDelay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (!visible) {
        return (
            <div className="fixed bottom-0 right-0 p-4 z-5">
                <Button 
                    icon={<MessageSquare size={24} />} 
                    rounded 
                    size="large" 
                    className="shadow-4" 
                    onClick={() => setVisible(true)}
                    tooltip="AI Assistant" 
                />
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 right-0 p-4 z-5 w-full md:w-25rem">
            <Card className="shadow-6 border-round-xl overflow-hidden p-0">
                <div className="bg-primary p-3 flex align-items-center justify-content-between text-white">
                    <div className="flex align-items-center gap-2">
                        <MessageSquare size={20} />
                        <span className="font-bold">AI Assistant</span>
                    </div>
                    <Button icon={<X size={20} />} className="p-button-text p-button-rounded text-white p-0 h-2rem w-2rem" onClick={() => setVisible(false)} />
                </div>
                
                <ScrollPanel style={{ width: '100%', height: '300px' }} className="p-3 bg-gray-50">
                    <div className="flex flex-column gap-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div className={`p-2 border-round-lg max-w-15rem ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white shadow-1'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-content-start">
                                <div className="p-2 border-round-lg bg-white shadow-1 italic text-500">
                                    AI is thinking...
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollPanel>

                <div className="p-3 border-top-1 surface-border bg-white flex gap-2">
                    <InputText 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a query..." 
                        className="flex-grow-1"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button icon={<Send size={18} />} onClick={handleSend} disabled={loading} />
                </div>
                <div className="bg-gray-100 p-1 text-center">
                    <span style={{ fontSize: '10px' }} className="text-500">Secure Isolation Gateway Active</span>
                </div>
            </Card>
        </div>
    );
};
