import React from 'react';
import AccessibilityOutlinedIcon from "@mui/icons-material/AccessibilityOutlined";
import "../styles.css/header.css";
import { Player } from './Player';

interface HeaderProps {
  onToggleDialog: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleDialog }) => {
  
  return (
    <div className="header">
      <div><Player /></div>
      <div>
        <ul>
          <li>
            <a href="https://block.xyz./news/">NEWS</a>
          </li>
          <li>
            <a href="https://block.xyz./careers">CAREERS</a>
          </li>
          <li>
            <a href="https://investors.block.xyz/overview/default.aspx">
              INVESTORS
            </a>
          </li>
          <li>
          </li>
            <a onClick={onToggleDialog} role="button" aria-label="Accessibility options">
              <AccessibilityOutlinedIcon />
            </a>
        </ul>
      </div>
    </div>
  );
};

export default Header;
