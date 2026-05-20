import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Send } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addMessage, setTyping } from '../chatSlice';

const MessageItem = memo(({ msg }) => {
  const isMe = msg.sender === 'me';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-primary text-white rounded-br-none' : 'bg-surface-hover text-text rounded-bl-none border border-border'}`}>
        {msg.text}
      </div>
    </div>
  );
});
MessageItem.displayName = 'MessageItem';

const ChatPanel = () => {
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);
  const dispatch = useAppDispatch();
  const { messages, isTyping } = useAppSelector(state => state.chat);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        dispatch(setTyping(true));
        setTimeout(() => {
          dispatch(setTyping(false));
          dispatch(addMessage({ id: Date.now().toString(), sender: 'other', text: 'Just testing the mock websocket!', timestamp: Date.now() }));
        }, 2000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addMessage({ id: Date.now().toString(), sender: 'me', text: text.trim(), timestamp: Date.now() }));
    setText('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
        <div>
          <h2 className="text-xl font-bold text-text">Team Chat</h2>
          <div className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>Online
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 mb-4 scrollbar-thin">
        {messages.map(msg => (<MessageItem key={msg.id} msg={msg} />))}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-surface-hover text-text rounded-2xl rounded-bl-none border border-border px-4 py-2 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="mt-auto relative">
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." className="w-full bg-surface-hover border border-border rounded-xl py-3 pl-4 pr-12 text-sm text-text outline-none focus:border-primary transition-colors placeholder:text-text-muted" />
        <button type="submit" disabled={!text.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
