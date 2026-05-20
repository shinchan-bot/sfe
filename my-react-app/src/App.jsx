import React, { Suspense, lazy } from 'react';
import { Layout, Search, Settings, Users, MessageSquare, Activity, FileText } from 'lucide-react';

const KanbanBoard = lazy(() => import('./features/board/components/Board'));
const TopSearch = lazy(() => import('./features/search/components/TopSearch'));
const ChatPanel = lazy(() => import('./features/chat/components/ChatPanel'));
const ActivityFeed = lazy(() => import('./features/feed/components/ActivityFeed'));
const DataTable = lazy(() => import('./features/table/components/DataTable'));
const MarkdownNotes = lazy(() => import('./features/notes/components/MarkdownNotes'));

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-text font-sans">
      {/* Sidebar */}
      <aside className="w-16 flex flex-col items-center py-4 border-r border-border bg-surface shrink-0 z-10">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
          <Layout size={20} className="text-white" />
        </div>
        <nav className="flex flex-col gap-4 flex-1 w-full items-center">
          <SidebarIcon icon={Users} active />
          <SidebarIcon icon={MessageSquare} />
          <SidebarIcon icon={Activity} />
          <SidebarIcon icon={FileText} />
        </nav>
        <SidebarIcon icon={Settings} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Search Bar */}
        <header className="h-14 border-b border-border bg-surface/50 backdrop-blur-md flex items-center px-6 shrink-0 z-10">
          <Suspense fallback={<div className="h-8 w-64 bg-surface rounded-md animate-pulse" />}>
            <TopSearch />
          </Suspense>
        </header>

        {/* Dashboard Grid */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[800px] min-h-max">

            {/* Top row */}
            <section className="xl:col-span-2 bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col h-[400px]">
              <Suspense fallback={<LoadingFallback />}>
                <KanbanBoard />
              </Suspense>
            </section>

            <section className="bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col h-[400px]">
              <Suspense fallback={<LoadingFallback />}>
                <ChatPanel />
              </Suspense>
            </section>

            {/* Middle row */}
            <section className="bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col h-[400px]">
              <Suspense fallback={<LoadingFallback />}>
                <ActivityFeed />
              </Suspense>
            </section>

            <section className="xl:col-span-2 bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col h-[400px]">
              <Suspense fallback={<LoadingFallback />}>
                <MarkdownNotes />
              </Suspense>
            </section>

            {/* Bottom row */}
            <section className="xl:col-span-3 bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col h-[400px]">
              <Suspense fallback={<LoadingFallback />}>
                <DataTable />
              </Suspense>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

const SidebarIcon = ({ icon: Icon, active }) => (
  <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
    ${active ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-surface-hover hover:text-text'}
  `}>
    <Icon size={20} />
  </button>
);

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default App;
