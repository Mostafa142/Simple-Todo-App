import React from "react";
interface Props {
  showModal: boolean;
  handleToggleModal: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<Props> = ({ children, showModal, handleToggleModal }) => {
  return (
    <>
      <dialog id="my_modal_3" className={`modal ${showModal && "modal-open"}`}>
        <div className="modal-box">
          <button
            onClick={handleToggleModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="py-4">{children}</div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
