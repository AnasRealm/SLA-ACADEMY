import React, { useState } from "react";
import { resendVerificationEmail } from "../services/authService";

const VerificationBanner = () => {
  const [loading, setLoading] = useState(false);
  
  // جلب المستخدم من اللوكال ستوريج للتحقق من حالته
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem("accessToken");

  // الشرط: مسجل دخول + لا يوجد تاريخ تفعيل
  const shouldShow = token && user && !user.email_verified_at;

  if (!shouldShow) return null;

  const handleResend = async () => {
    setLoading(true);
    try {
      await resendVerificationEmail();
      alert("تم إرسال رابط التحقق بنجاح إلى بريدك الإلكتروني.");
    } catch (error) {
      alert("حدث خطأ أثناء الإرسال أو أن الحساب مفعل مسبقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#fff3cd",
      color: "#856404",
      padding: "10px",
      textAlign: "center",
      borderBottom: "1px solid #ffeeba",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px"
    }}>
      <span>⚠️ حسابك غير مفعل. يرجى التحقق من بريدك الإلكتروني.</span>
      <button 
        onClick={handleResend} 
        disabled={loading}
        style={{
          backgroundColor: "#856404",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {loading ? "جاري الإرسال..." : "إعادة إرسال الرابط"}
      </button>
    </div>
  );
};

export default VerificationBanner;