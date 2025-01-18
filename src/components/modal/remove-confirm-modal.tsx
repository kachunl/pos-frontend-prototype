import '../../styles/components/modal/remove-confirm-modal.css'

import { RemoveConfirmModalProps } from '../../utils/types'
import { X } from 'lucide-react'

const RemoveConfirmModal = ({ isOpen, onConfirm, onCancel, title, message }: RemoveConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <div className="header">
                  <h3 className="title">{title}</h3>
                  <button onClick={onCancel} className="closeButton">
                    <X size={20} />
                  </button>
                </div>

                <p className="message">{message}</p>
                
                <div className="buttonGroup">
                  <button onClick={onCancel} className={`${"button"} ${"cancelButton"}`}>
                      Cancel
                  </button>

                  <button onClick={onConfirm} className={`${"button"} ${"confirmButton"}`}>
                      Remove
                  </button>
                </div>
            
            </div>
        </div>
    )
};

export default RemoveConfirmModal;