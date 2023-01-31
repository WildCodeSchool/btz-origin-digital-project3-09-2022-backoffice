import React from "react";

type Props = {
  handleDeleteConfirmed: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleDeleteCancelled: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function ModalOnDelete({
  handleDeleteConfirmed,
  handleDeleteCancelled,
}: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to delete this item?</p>
        <div className="modal-buttons">
          <button
            className="bg-green w-1/2 mr-2"
            type="button"
            onClick={handleDeleteConfirmed}
          >
            Delete
          </button>
          <button
            className="bg-red w-1/2 ml-2"
            type="button"
            onClick={handleDeleteCancelled}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalOnDelete;
