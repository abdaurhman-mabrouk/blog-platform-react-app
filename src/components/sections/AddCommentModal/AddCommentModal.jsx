import React from 'react';
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function AddCommentModal({ modalBtnFunction }) {
  return (
    <>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCommentModal">
        Open Comment modal
      </button> */}

      <div
        className="modal fade"
        id="addCommentModal"
        tabindex="-1"
        aria-labelledby="addCommentModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addCommentModalLabel">
                Add Comment
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="message-text" className="col-form-label">
                    Comment:
                  </label>
                  <textarea
                    className="form-control"
                    id="comment-text"></textarea>
                </div>
              </form>
            </div>
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
                onClick={() => {
                  return false;
                }}>
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCommentModal;
