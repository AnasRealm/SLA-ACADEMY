import React, { useState } from 'react';
import { X, Upload, CheckCircle, Copy } from 'lucide-react';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, coursePrice, courseName, isTrainingCourse }) => {
  const { data: methods, isLoading } = usePaymentMethods();
  const [selectedMethodId, setSelectedMethodId] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);

  if (!isOpen) return null;

  // منطق: إذا كان كورس تدريبي (Training) نعرض مودال التواصل فقط
  if (isTrainingCourse) {
    return (
      <div className="modal-overlay">
        <div className="modal-content contact-mode">
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
          <div className="modal-header">
            <h3>حجز مقعد في المعسكر</h3>
          </div>
          <div className="modal-body">
            <p>للتسجيل في <strong>{courseName}</strong>، يرجى التواصل مع إدارة المعهد مباشرة لتثبيت الحجز.</p>
            <div className="contact-box-highlight">
              <span>رقم التواصل / واتساب:</span>
              <strong dir="ltr">+963 912 345 678</strong>
            </div>
            <p className="note">المقاعد محدودة، الأولوية لمن يثبت الحجز أولاً.</p>
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={onClose}>حسناً، فهمت</button>
          </div>
        </div>
      </div>
    );
  }

  // --- منطق الدفع للكورسات الأونلاين ---

  // البحث عن الطريقة المختارة لعرض تفاصيلها
  const selectedMethod = methods?.find(m => m.id.toString() === selectedMethodId);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا كود إرسال الدفع للباك إند
    console.log("Submitting:", { selectedMethodId, receiptFile });
    alert("تم إرسال طلبك وجاري مراجعته من قبل الإدارة");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content payment-mode">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-header">
          <h3>إيداع الأموال وتفعيل الدورة</h3>
          <p>اتبع الخطوات لإتمام الاشتراك في: {courseName}</p>
        </div>

        {isLoading ? (
          <p style={{textAlign: 'center', padding: '20px'}}>جاري تحميل طرق الدفع...</p>
        ) : (
          <form className="modal-body" onSubmit={handleSubmit}>
            
            {/* 1. اختر طريقة الدفع */}
            <div className="form-group">
              <label>1. اختر طريقة الدفع</label>
              <select 
                value={selectedMethodId} 
                onChange={(e) => setSelectedMethodId(e.target.value)}
                className="custom-select"
                required
              >
                <option value="">-- حدد الوسيلة --</option>
                {methods?.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.provider_name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. تفاصيل الحساب (تظهر فقط عند الاختيار) */}
            {selectedMethod && (
              <div className="account-details-box fade-in">
                <div className="detail-row">
                  <span>اسم المستلم (Holder):</span>
                  <strong>{selectedMethod.account_holder}</strong>
                </div>
                <div className="detail-row highlight-row">
                  <span>رقم الحساب للتحويل:</span>
                  <div className="copy-wrapper">
                    <strong dir="ltr">{selectedMethod.account_number}</strong>
                    <Copy size={14} style={{cursor: 'pointer'}} title="نسخ" />
                  </div>
                </div>
                <p className="instruction-text">يرجى تحويل المبلغ المذكور أدناه لهذا الرقم ثم رفع صورة الإشعار.</p>
              </div>
            )}

            {/* 3. المبلغ */}
            <div className="form-group">
              <label>3. المبلغ المطلوب تحويله</label>
              <div className="amount-display">
                <span className="currency">$</span>
                <span className="value">{coursePrice}</span>
              </div>
            </div>

            {/* 4. رفع الإيصال */}
            <div className="form-group">
              <label>4. رفع إثبات التحويل (الإيصال)</label>
              <div className="file-upload-wrapper">
                <input 
                  type="file" 
                  id="receipt" 
                  onChange={handleFileChange} 
                  accept="image/*,application/pdf"
                  hidden
                  required
                />
                <label htmlFor="receipt" className="file-upload-label">
                  {receiptFile ? (
                    <span className="file-success"><CheckCircle size={18}/> تم اختيار الملف: {receiptFile.name}</span>
                  ) : (
                    <>
                      <Upload size={20} />
                      <span>اضغط هنا لرفع الصورة أو ملف PDF</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>إلغاء</button>
              <button type="submit" className="btn-primary">إرسال الإيصال للتفعيل</button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;