import React, { FC, ReactNode } from "react";
import Modal from "react-modal";

import { closeModal } from "../slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../store";

Modal.setAppElement("#root");

interface ModalComponentProps {
  children: ReactNode;
  onClose?: () => void;
  title?: string;
  code: string;
}

const ModalComponent: FC<ModalComponentProps> = ({
  children,
  onClose,
  title = "Modal",
  code
}) => {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector((state) => state.modal.modalState[code]);

  const handleCloseModal = () => {
    dispatch(closeModal(code));
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick
      className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {title ? (
        <div className="border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      ) : null}
      {children}
    </Modal>
  );
};

export default ModalComponent;
