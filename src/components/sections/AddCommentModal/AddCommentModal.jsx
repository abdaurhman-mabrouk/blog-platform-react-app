import React from 'react';
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function AddCommentModal({ modalBtnFunction }) {
  return (
    <>
      {/* <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCommentModal">
        Open Comment modal
      </button> */}

      <div
        class="modal fade"
        id="addCommentModal"
        tabindex="-1"
        aria-labelledby="addCommentModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addCommentModalLabel">
                Add Comment
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Comment:
                  </label>
                  <textarea class="form-control" id="comment-text"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
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
