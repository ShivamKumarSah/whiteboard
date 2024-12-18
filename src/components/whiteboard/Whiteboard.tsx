import React from 'react';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { ZoomControls } from './ZoomControls';
import { VerticalMenu } from './menu/VerticalMenu';

export const Whiteboard = () => {
  return (
    <div className="relative w-full h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Canvas />
      <Toolbar />
      <VerticalMenu />
      <ZoomControls />
    </div>
  );
};