import React, { useState } from 'react';
import './ForgotPasswordModal.css';
import { forgotPassword } from '../services/authService';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) {
    return null;
  }

  const handleSendLink = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const data = await forgotPassword(email);
      setSuccessMessage(data.message);
      // Optional: close modal automatically after a delay
      setTimeout(() => {
        onClose();
        resetState();
      }, 3000);
    } catch (err) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
      setEmail('');
      setIsLoading(false);
      setError(null);
      setSuccessMessage(null);
  }

  const handleClose = () => {
      resetState();
      onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>إعادة تعيين كلمة المرور</h2>
        <p>أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين</p>

        {error && <div className="error-message modal-error">{error}</div>}
        {successMessage && <div className="success-message modal-success">{successMessage}</div>}

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            className="input-field"
            disabled={isLoading || successMessage}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleClose} className="btn-cancel" disabled={isLoading}>الغاء</button>
          <button onClick={handleSendLink} className="btn-send" disabled={isLoading || successMessage}>
            {isLoading ? 'جاري الإرسال...' : 'ارسال الرابط'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
