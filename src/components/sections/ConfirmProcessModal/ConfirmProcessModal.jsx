import React from 'react';
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function ConfirmProcessModal({
  modalTitle,
  modalBody,
  modalBtnFunction,
  modalBtnText,
}) {
  return (
    <>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#confirmProcessModal"
        id="confirmProcessModalBtn">
        Launch demo modal
      </button> */}

      <div
        className="modal fade"
        id="confirmProcessModal"
        tabIndex="-1"
        aria-labelledby="confirmProcessModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="confirmProcessModalLabel">
                {modalTitle && modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">{modalBody && modalBody}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={modalBtnFunction}>
                {modalBtnText ? modalBtnText : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmProcessModal;
