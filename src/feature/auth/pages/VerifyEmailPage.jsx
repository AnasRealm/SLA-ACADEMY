import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    
    // استخراج البارامترات من الرابط (id, hash, expires, signature)
    const queryParams = location.search; // ?id=...&hash=...

    if (queryParams) {
      hasVerified.current = true;
      verifyEmail(queryParams, {
        onSuccess: () => {
          alert("تم تفعيل البريد الإلكتروني بنجاح!");
          navigate('/');
        },
        onError: () => {
          alert("فشل التحقق من الرابط أو الرابط منتهي الصلاحية.");
          navigate('/login');
        }
      });
    } else {
      navigate('/login');
    }
  }, [location, verifyEmail, navigate]);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h3>جاري التحقق من البريد الإلكتروني...</h3>
      <div className="spinner">⌛</div>
    </div>
  );
};

export default VerifyEmailPage;