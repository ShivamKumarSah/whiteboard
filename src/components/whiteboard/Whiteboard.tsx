import React from 'react';
import { Canvas } from './Canvas';
import { Background } from './Background';
import { Toolbar } from './Toolbar';
import { ZoomControls } from './ZoomControls';
import { VerticalMenu } from './menu/VerticalMenu';

export const Whiteboard = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Background />
      <Canvas />
      <Toolbar />
      <VerticalMenu />
      <ZoomControls />
    </div>
  );
};