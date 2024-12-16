import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { SearchTrigger } from './SearchTrigger';
import { SearchContent } from './SearchContent';
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShortcut';
import type { SearchResultType } from '../../../types';

const MOCK_RESULTS: SearchResultType[] = [
  { id: '1', name: 'Project Planning', type: 'board' },
  { id: '2', name: 'Design System', type: 'board' },
  { id: '3', name: 'Marketing Campaign', type: 'board' },
];

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MOCK_RESULTS);

  useKeyboardShortcut('/', () => setIsOpen(true));

  useEffect(() => {
    if (query) {
      const filtered = MOCK_RESULTS.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(MOCK_RESULTS);
    }
  }, [query]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <SearchTrigger />
      <SearchContent
        query={query}
        results={results}
        onQueryChange={setQuery}
      />
    </Dialog.Root>
  );
};