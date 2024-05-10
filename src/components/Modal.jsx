import { useState } from 'react';
import '../css/Modal.css'

function OffCanvas({children}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='modal-fuck'>
      <button onClick={toggleMenu}>Open Menu</button>
      {isOpen && (
        <div className="backdrop" onClick={toggleMenu}>
          <div className="menu" style={{ zIndex: 10000000 }}>
            <button className="close-btn" onClick={toggleMenu}>&times;</button>
            <div className="modal-content">
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                {children}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OffCanvas;