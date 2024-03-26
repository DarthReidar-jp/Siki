import React from 'react';

interface SidebarToggleButtonProps {
    onClick: () => void;
  }
  
  const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ onClick }) => (
    <div>
      <button className="button" onClick={onClick}>=</button>
    </div>
  );
  
  export default SidebarToggleButton;
  