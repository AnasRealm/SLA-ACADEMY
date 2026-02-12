import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken) {
      // تجهيز البيانات بنفس الهيكلية التي يتوقعها useAuth
      handleGoogleCallback({
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {} // يمكن تحديث اليوزر لاحقاً عبر بروفايل API
      });
    } else {
      // في حال الفشل
      navigate("/login");
    }
  }, [searchParams, navigate, handleGoogleCallback]);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h3>جاري تسجيل الدخول...</h3>
      <p>يرجى الانتظار</p>
    </div>
  );
};

export default GoogleCallbackPage;