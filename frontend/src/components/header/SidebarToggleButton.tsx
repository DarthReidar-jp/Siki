import React from 'react';

interface SidebarToggleButtonProps {
    onClick: () => void;
  }
  
  const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ onClick }) => (
    <button className="custom-btn" onClick={onClick}>=</button>
  );
  
  export default SidebarToggleButton;
  