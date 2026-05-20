import React, { useState, useDeferredValue, useEffect, useMemo, useRef, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const MOCK_DATA = [
  'Research competitors',
  'Design system setup',
  'Configure Redux Toolkit',
  'Implement dnd-kit',
  'Project setup with Vite',
  'Virtualize activity feed',
  'Setup WebSocket mock',
  'Optimize with useMemo',
  'Create markdown preview',
  'Add code splitting',
  'Handle optimistic updates',
];

const HighlightMatch = React.memo(({ text, query }: { text: string; query: string }) => {
  if (!query) return <span>{text}</span>;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-primary/30 text-primary-hover font-medium rounded-sm px-0.5">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
});
HighlightMatch.displayName = 'HighlightMatch';

const fetchSearchResults = async (q: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  if (!q) return [];
  const lowerQuery = q.toLowerCase();
  return MOCK_DATA.filter(item => item.toLowerCase().includes(lowerQuery));
};

const TopSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const deferredQuery = useDeferredValue(query);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: filteredResults = [], isFetching: isTyping } = useQuery({
    queryKey: ['search', deferredQuery],
    queryFn: () => fetchSearchResults(deferredQuery),
    enabled: true,
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [deferredQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        setQuery(filteredResults[selectedIndex]);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, [isOpen, filteredResults, selectedIndex]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div
        className={`flex items-center gap-2 bg-surface px-3 py-2 rounded-md border transition-colors ${isOpen ? 'border-primary ring-1 ring-primary/50' : 'border-border'
          }`}
      >
        <Search size={16} className="text-text-muted" />
        <input
          type="text"
          className="bg-transparent border-none outline-none text-sm text-text flex-1 placeholder:text-text-muted/50"
          placeholder="Search everywhere... (Press '/' to focus)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {isTyping && <Loader2 size={14} className="animate-spin text-text-muted" />}
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-md shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <ul className="py-1">
              {filteredResults.map((result, index) => (
                <li
                  key={result}
                  className={`px-4 py-2 text-sm cursor-pointer ${index === selectedIndex ? 'bg-surface-hover text-text' : 'text-text-muted hover:bg-surface-hover hover:text-text'
                    }`}
                  onClick={() => {
                    setQuery(result);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <HighlightMatch text={result} query={deferredQuery} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-text-muted">
              {isTyping ? 'Searching...' : 'No results found.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopSearch;
