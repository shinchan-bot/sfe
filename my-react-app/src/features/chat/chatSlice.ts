import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
}

const initialState: ChatState = {
  messages: [
    { id: '1', sender: 'other', text: 'Hey, did you check the new design system?', timestamp: Date.now() - 60000 },
    { id: '2', sender: 'me', text: 'Yes, looking good. I will start implementing it.', timestamp: Date.now() - 30000 },
  ],
  isTyping: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
  },
});

export const { addMessage, setTyping } = chatSlice.actions;
export default chatSlice.reducer;
