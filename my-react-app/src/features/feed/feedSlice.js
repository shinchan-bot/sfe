import { createSlice } from '@reduxjs/toolkit';
import { formatDistanceToNow } from 'date-fns';

const generateActivities = () => {
  const users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
  const actions = ['commented on', 'updated', 'completed', 'assigned', 'created'];
  const targets = ['Task-101', 'Design System', 'API Specs', 'Landing Page', 'Authentication'];
  
  return Array.from({ length: 10000 }).map((_, i) => ({
    id: `act-${i}`,
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    target: targets[Math.floor(Math.random() * targets.length)],
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

const initialState = {
  activities: generateActivities().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
});

export default feedSlice.reducer;
