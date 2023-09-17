import React from "react";

function InfoTooltip({ isOpen, onClose, isSuccessInfoTooltipStatus, tooltipMessage, tooltipIcon }) {
  
  return (
    <div className={`popup popup_type_infotooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
      <button
        type="button"
        className="popup__close popup__close-author"
        aria-label="Закрыть всплывающее окно"
        onClick={onClose}
      />
        <img
          src={tooltipIcon}
          alt={isSuccessInfoTooltipStatus  ? "Знак успеха" : "Знак ошибки"}
          className="popup__tooltip-icon"
        />
        <p className="popup__tooltip-text">{tooltipMessage}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
