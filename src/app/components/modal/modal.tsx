import React from 'react';
import './popup.scss'; 

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  buttons: { label: string; onClick: () => void; type?: string }[];
}

export default function Modal({ title, children,  buttons }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-inner">
        <p className="modal-title">{title}</p>
        <div className="modal-content">{children}</div>
        <div className="modal-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`button ${button.type || ''}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
