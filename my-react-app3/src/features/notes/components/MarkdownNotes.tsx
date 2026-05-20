import React, { useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Save, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setContent, saveComplete } from '../notesSlice';

const MarkdownNotes = () => {
  const dispatch = useAppDispatch();
  const { content, isSaving, lastSaved } = useAppSelector(state => state.notes);

  // Autosave simulation
  useEffect(() => {
    if (isSaving) {
      const timer = setTimeout(() => {
        dispatch(saveComplete());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [content, isSaving, dispatch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent(e.target.value));
  }, [dispatch]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-text mb-1">Markdown Notes</h2>
          <p className="text-sm text-text-muted">Live preview and auto-save.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          {isSaving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>{lastSaved ? `Saved ${lastSaved}` : 'All changes saved'}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 h-full min-h-0">
        <div className="h-full border border-border rounded-lg overflow-hidden bg-surface-hover/30 focus-within:border-primary transition-colors">
          <textarea
            value={content}
            onChange={handleChange}
            className="w-full h-full bg-transparent p-4 text-sm text-text outline-none resize-none scrollbar-thin"
            placeholder="Write markdown here..."
          />
        </div>
        
        <div className="h-full border border-border rounded-lg bg-surface p-4 overflow-y-auto scrollbar-thin prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownNotes;
