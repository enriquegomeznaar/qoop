import React from 'react';
import './Header.css'; // Asegúrate de que la ruta sea correcta

function Header() {
  return (
    <>
      <div className="header">
        <div>Music</div>
        <div>
          <ul>
            <li>
              <a
                href="https://www.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                NEWS
              </a>
            </li>
            <li>
              <a
                href="https://www.apple.com/music/"
                target="_blank"
                rel="noopener noreferrer"
              >
                CAREERS
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/music"
                target="_blank"
                rel="noopener noreferrer"
              >
                INVESTORS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
