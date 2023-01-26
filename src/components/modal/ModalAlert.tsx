import React from "react";

type Props = {
  message: string;
  handleDeleteCancelled: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function ModalAlert({ message, handleDeleteCancelled }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button
            className="bg-red w-1/2 m-auto"
            type="button"
            onClick={handleDeleteCancelled}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAlert;
