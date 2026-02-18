import React, { useState } from 'react';
import { X, Upload, CheckCircle, Copy, Loader2 } from 'lucide-react'; // أضفت Loader2 للتحميل
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { useSubmitEnrollment } from '../hooks/useEnrollment'; // استيراد الهوك الجديد
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, courseId, coursePrice, courseName, isTrainingCourse }) => {
  const { data: methods, isLoading: methodsLoading } = usePaymentMethods();
  
  // استدعاء هوك الدفع
  const { mutate: enroll, isPending: isSubmitting } = useSubmitEnrollment();

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

  const selectedMethod = methods?.find(m => m.id.toString() === selectedMethodId);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!receiptFile || !selectedMethodId) {
        alert("يرجى اختيار طريقة الدفع ورفع صورة الإيصال");
        return;
    }

    // إرسال البيانات للباك إند
    enroll(
      {
        courseId: courseId,
        paymentMethodId: selectedMethodId,
        receiptFile: receiptFile
      },
      {
        onSuccess: (data) => {
          alert("تم إرسال طلب الاشتراك بنجاح! سيتم تفعيل الدورة بعد مراجعة الإيصال.");
          onClose();
          // تصفير الحقول
          setReceiptFile(null);
          setSelectedMethodId('');
        },
        onError: (error) => {
          console.error(error);
          alert(error?.response?.data?.message || "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
        }
      }
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content payment-mode">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-header">
          <h3>إيداع الأموال وتفعيل الدورة</h3>
          <p>اتبع الخطوات لإتمام الاشتراك في: {courseName}</p>
        </div>

        {methodsLoading ? (
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

            {/* 2. تفاصيل الحساب */}
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
              <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>إلغاء</button>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center'}}>
                        <Loader2 className="animate-spin" size={18} /> جاري الإرسال...
                    </span>
                ) : 'إرسال الإيصال للتفعيل'}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;