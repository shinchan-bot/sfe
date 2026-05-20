import React, { useMemo } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilter, setPage, setSort, UserRow } from '../tableSlice';

const PAGE_SIZE = 3;

const DataTable = () => {
  const dispatch = useAppDispatch();
  const { data, filter, page, sortBy, sortDesc } = useAppSelector(state => state.table);

  // useMemo for filtering and sorting
  const processedData = useMemo(() => {
    let result = [...data];

    if (filter) {
      const lowerFilter = filter.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerFilter) || 
        item.role.toLowerCase().includes(lowerFilter)
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (valA < valB) return sortDesc ? 1 : -1;
        if (valA > valB) return sortDesc ? -1 : 1;
        return 0;
      });
    }

    return result;
  }, [data, filter, sortBy, sortDesc]);

  const totalPages = Math.ceil(processedData.length / PAGE_SIZE) || 1;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return processedData.slice(start, start + PAGE_SIZE);
  }, [processedData, page]);

  const SortIcon = ({ column }: { column: keyof UserRow }) => {
    if (sortBy !== column) return null;
    return sortDesc ? <ChevronDown size={14} /> : <ChevronUp size={14} />;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-text mb-1">User Directory</h2>
          <p className="text-sm text-text-muted">Manage team members and roles.</p>
        </div>
        
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Filter users..."
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            className="bg-surface-hover border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text outline-none focus:border-primary w-64 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-border rounded-lg bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-hover sticky top-0">
            <tr>
              {['Name', 'Role', 'Status', 'Last Login'].map((col) => {
                const key = col === 'Last Login' ? 'lastLogin' : col.toLowerCase() as keyof UserRow;
                return (
                  <th 
                    key={key} 
                    className="p-4 font-medium text-text-muted cursor-pointer hover:text-text transition-colors"
                    onClick={() => dispatch(setSort(key))}
                  >
                    <div className="flex items-center gap-1">
                      {col} <SortIcon column={key} />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} className="border-t border-border hover:bg-surface-hover/50 transition-colors">
                  <td className="p-4 font-medium text-text">{row.name}</td>
                  <td className="p-4 text-text-muted">{row.role}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${row.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                        row.status === 'Inactive' ? 'bg-red-500/10 text-red-500' : 
                        'bg-yellow-500/10 text-yellow-500'}
                    `}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-text-muted">{row.lastLogin}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-text-muted">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-text-muted">
          Showing {((page - 1) * PAGE_SIZE) + 1} to {Math.min(page * PAGE_SIZE, processedData.length)} of {processedData.length} entries
        </span>
        <div className="flex gap-2">
          <button 
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
            className="px-3 py-1.5 border border-border rounded-md text-text hover:bg-surface-hover disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            Previous
          </button>
          <button 
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
            className="px-3 py-1.5 border border-border rounded-md text-text hover:bg-surface-hover disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
