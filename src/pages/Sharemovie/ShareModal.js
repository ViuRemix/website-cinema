import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";

import "./Share.css";

const ShareModal = ({ movie, url, title }) => {
  return (
    <div
      className="modal fade"
      id="shareModal"
      tabIndex="-1"
      aria-labelledby="shareModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="share-buttons flex justify-around">
              <FacebookShareButton url={url} quote={title} movie={movie}>
                <button className="share-btn bg-blue-600 hover:bg-blue-700">
                  <i className="bi bi-facebook"></i>
                </button>
              </FacebookShareButton>

              <TwitterShareButton url={url} title={title} movie={movie}>
                <button className="share-btn bg-blue-400 hover:bg-blue-500">
                  <i className="bi bi-twitter"></i>
                </button>
              </TwitterShareButton>

              <WhatsappShareButton url={url} title={title} movie={movie}>
                <button className="share-btn bg-green-500 hover:bg-green-600">
                  <i className="bi bi-whatsapp"></i>
                </button>
              </WhatsappShareButton>

              <EmailShareButton
                url={url}
                subject={title}
                body={url}
                movie={movie}
              >
                <button className="share-btn bg-gray-600 hover:bg-gray-700">
                  <i className="bi bi-envelope"></i>
                </button>
              </EmailShareButton>

              <TelegramShareButton url={url} title={title} movie={movie}>
                <button className="share-btn bg-blue-400 hover:bg-blue-500">
                  <i className="bi bi-telegram"></i>
                </button>
              </TelegramShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
