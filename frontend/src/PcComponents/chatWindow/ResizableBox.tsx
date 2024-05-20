import React, { ReactNode, useState, MouseEvent } from 'react';

interface ResizableBoxProps {
  children: ReactNode;
}

const ResizableBox: React.FC<ResizableBoxProps> = ({ children }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 320, height: 200 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isResizing) {
      const dx = e.clientX - position.x;
      const dy = e.clientY - position.y;
      setDimensions(({ width, height }) => ({ width: width + dx, height: height + dy }));
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  return (
    <div
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        position: 'relative',
        resize: 'none',
        overflow: 'auto'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '10px',
          height: '10px',
          cursor: 'nwse-resize',
          backgroundColor: 'red'
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ResizableBox;