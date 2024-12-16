import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../store/auth';

export const UserMenu = () => {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 animate-fade-in"
          sideOffset={5}
        >
          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>

          <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
            <Settings className="w-4 h-4" />
            Settings
          </DropdownMenu.Item>

          <DropdownMenu.Item 
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg cursor-pointer"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};