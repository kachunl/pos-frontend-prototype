import '../../styles/components/modal/remove-confirm-modal.css'

import { RemoveConfirmModalProps } from '../../utils/types'
import { X } from 'lucide-react'

const RemoveConfirmModal = ({ isOpen, onConfirm, onCancel, title, message }: RemoveConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                
                <div className="confirm-modal-header">
                    <h3 className="confirm-modal-title">{title}</h3>
                    <button onClick={onCancel} className="confirm-modal-close-button">
                        <X size={20} />
                    </button>
                </div>

                <p className="confirm-modal-message">{message}</p>
                
                <div className="confirm-modal-button-group">
                    <button onClick={onCancel} className={`${"confirm-modal-button"} ${"confirm-modal-cancel-button"}`}>
                        Cancel
                    </button>

                    <button onClick={onConfirm} className={`${"confirm-modal-button"} ${"confirm-modal-confirm-button"}`}>
                        Remove
                    </button>
                </div>
                
            </div>
        </div>
    )
};

export default RemoveConfirmModal;