import React from 'react';
import { List } from 'react-window';
import { formatDistanceToNow } from 'date-fns';
import { useAppSelector } from '../../../store/hooks';

const ActivityRow = ({ index, style, activities }) => {
  const activity = activities[index];
  return (
    <div style={style} className="pr-4 pb-2">
      <div className="bg-surface-hover/30 rounded-lg p-3 border border-border/50 text-sm h-full flex flex-col justify-center">
        <p className="text-text">
          <span className="font-semibold text-primary">{activity.user}</span>{' '}
          <span className="text-text-muted">{activity.action}</span>{' '}
          <span className="font-medium text-text">{activity.target}</span>
        </p>
        <p className="text-xs text-text-muted mt-1">
          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const ActivityFeed = () => {
  const activities = useAppSelector(state => state.feed.activities);
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-text mb-1">Activity Feed</h2>
        <p className="text-sm text-text-muted">Showing {activities.length.toLocaleString()} events with virtualization.</p>
      </div>
      <div className="flex-1 -mr-2 h-[300px]">
        <List
          style={{ height: '100%', width: '100%' }}
          rowCount={activities.length}
          rowHeight={70}
          rowComponent={ActivityRow}
          rowProps={{ activities }}
          className="scrollbar-thin"
        />
      </div>
    </div>
  );
};

export default ActivityFeed;
