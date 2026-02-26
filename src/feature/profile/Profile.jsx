import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, User, Lock, LogOut, BookOpen, FileText, Compass, ChevronLeft } from "lucide-react";
import MainLayout from "../../shared/layout/MainLayout";
import { logoutUser, fetchUserProfile, updateProfileAvatar } from "../auth/services/authService";
import { useStudentCourses, useStudentEnrollments } from "../Courses/hooks/useEnrollment";
import { fetchPopularCourses } from "../MostPopular/services/mostPopularService";
import "./Profile.css";

const ENROLLMENT_STATUS_OPTIONS = [
  { value: "all", label: "الكل" },
  { value: "approved", label: "موافق عليه" },
  { value: "pending", label: "قيد المراجعة" },
  { value: "rejected", label: "مرفوض" },
  { value: "cancelled", label: "ملغي" },
];

const getEnrollmentStatusClass = (status) => {
  if (!status) return "";
  const s = String(status).toLowerCase();
  if (s.includes("موافق") || s === "approved") return "approved";
  if (s.includes("مرفوض") || s === "rejected") return "rejected";
  if (s.includes("مراجعة") || s === "pending") return "pending";
  if (s.includes("ملغي") || s === "cancelled") return "cancelled";
  return "";
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [enrollmentPage, setEnrollmentPage] = useState(1);
  const [enrollmentStatus, setEnrollmentStatus] = useState("all");
  const [avatarUploading, setAvatarUploading] = useState(false);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    retry: 1,
  });

  const { data: myCourses, isLoading: coursesLoading } = useStudentCourses();
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useStudentEnrollments({
    page: enrollmentPage,
    per_page: 10,
    status: enrollmentStatus,
  });
  const { data: popularCourses, isLoading: popularLoading } = useQuery({
    queryKey: ["popular-courses"],
    queryFn: fetchPopularCourses,
    retry: 1,
  });

  const enrollments = enrollmentsData?.enrollments ?? [];
  const pagination = enrollmentsData?.pagination ?? {};
  const totalPages = pagination.total_pages ?? pagination.last_page ?? 1;
  const currentPage = Number(pagination.current_page) || 1;

  // حالة لتغيير كلمة المرور (محلية)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password change submitted:", passwordData);
    // يمكنك هنا ربط دالة تغيير كلمة المرور من الـ API لاحقاً
    alert("سيتم تفعيل هذه الميزة قريباً");
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // في حال فشل الطلب، نحذف التوكن محلياً ونخرج المستخدم أيضاً
      localStorage.clear();
      navigate('/login');
    }
  };

  const handleEditPicClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('يرجى اختيار صورة بصيغة JPG أو PNG أو GIF أو WebP');
      e.target.value = '';
      return;
    }
    setAvatarUploading(true);
    try {
      const updated = await updateProfileAvatar(file);
      if (updated?.avatar != null) {
        queryClient.setQueryData(['user-profile'], (prev) => ({ ...prev, ...updated }));
      } else {
        await queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'فشل تحديث الصورة، حاول مرة أخرى';
      alert(msg);
    } finally {
      setAvatarUploading(false);
      e.target.value = '';
    }
  };

  // معالجة عرض الصورة: إذا لم توجد صورة من السيرفر نستخدم صورة افتراضية
  const getUserImage = () => {
    if (user && user.avatar) {
        return user.avatar.startsWith('http') ? user.avatar : user.avatar;
    }
    return "/imges/user-icon-profile.jpg"; // صورة افتراضية
  };

  // عرض حالة التحميل
  if (isLoading) {
    return (
      <MainLayout>
        <div className="profile-container-new" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3>جاري تحميل البيانات...</h3>
        </div>
      </MainLayout>
    );
  }

  // عرض حالة الخطأ أو عدم وجود مستخدم
  if (isError || !user) {
    return (
      <MainLayout>
        <div className="profile-container-new" style={{ textAlign: 'center', padding: '50px' }}>
          <h3 style={{ color: 'red' }}>فشل تحميل بيانات المستخدم. يرجى تسجيل الدخول مجدداً.</h3>
          <button onClick={() => navigate('/login')} className="btn-logout" style={{ marginTop: '20px' }}>
             العودة لتسجيل الدخول
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="profile-container-new">
        <main className="profile-content-new">
          
          {/* قسم المعلومات الشخصية */}
          <section className="profile-section">
            <h3 className="section-title-new"><User /> المعلومات الشخصية</h3>
            <div className="personal-info-card">
              
              <div className="avatar-wrapper-new">
                <img src={getUserImage()} alt="الصورة الشخصية" className="profile-img-new" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
                <button
                  type="button"
                  className="edit-pic-btn-new"
                  title="تغيير الصورة"
                  onClick={handleEditPicClick}
                  disabled={avatarUploading}
                >
                  {avatarUploading ? (
                    <span className="avatar-uploading-text">...</span>
                  ) : (
                    <Camera size={18} />
                  )}
                </button>
              </div>

              <div className="info-fields">
                <div className="info-field">
                  <label>الاسم الكامل</label>
                  {/* دمج الاسم الأول والثاني من الـ API */}
                  <div className="input-readonly">
                    {user.first_name} {user.last_name}
                  </div>
                </div>
                
                <div className="info-field">
                  <label>البريد الإلكتروني</label>
                  <div className="input-readonly">{user.email}</div>
                </div>
                
                <div className="info-field">
                  <label>رقم الهاتف</label>
                  <div className="input-readonly">
                    {user.phone ? user.phone : 'غير مضاف'}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* قسم كورساتي — الكورسات المشترك فيها */}
          <section className="profile-section">
            <h3 className="section-title-new"><BookOpen /> كورساتي</h3>
            {coursesLoading ? (
              <p className="profile-muted">جاري تحميل الكورسات...</p>
            ) : !myCourses?.length ? (
              <div className="profile-empty-block">
                <p className="profile-muted">لا توجد كورسات مشترك فيها حالياً.</p>
                <Link to="/" className="profile-link-btn">اكتشف الكورسات المتاحة</Link>
              </div>
            ) : (
              <div className="profile-courses-grid">
                {myCourses.map((course) => (
                  <Link to={`/course/${course.id}`} className="profile-course-card" key={course.id}>
                    <div className="profile-course-img-wrap">
                      <img
                        src={course.thumbnail_url?.startsWith("http") ? course.thumbnail_url : "/imges/coding.png"}
                        alt={course.title}
                        onError={(e) => { e.target.src = "/imges/coding.png"; }}
                      />
                    </div>
                    <div className="profile-course-info">
                      <h4>{course.title}</h4>
                      <span className="profile-course-meta">
                        {course.duration ? `${course.duration} ساعة` : ""}
                        {course.videos_count != null ? ` · ${course.videos_count} فيديو` : ""}
                      </span>
                      <span className="profile-course-go"><ChevronLeft /> افتح الكورس</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* قسم سجل الاشتراكات */}
          <section className="profile-section">
            <h3 className="section-title-new"><FileText /> سجل الاشتراكات</h3>
            <div className="profile-enrollment-filters">
              {ENROLLMENT_STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`profile-filter-btn ${enrollmentStatus === opt.value ? "active" : ""}`}
                  onClick={() => { setEnrollmentStatus(opt.value); setEnrollmentPage(1); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {enrollmentsLoading ? (
              <p className="profile-muted">جاري تحميل السجل...</p>
            ) : !enrollments.length ? (
              <p className="profile-muted">لا توجد طلبات اشتراك.</p>
            ) : (
              <>
                <div className="profile-enrollments-table-wrap">
                  <table className="profile-enrollments-table">
                    <thead>
                      <tr>
                        <th>الكورس</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((row) => (
                        <tr key={row.id}>
                          <td>{row.course_title}</td>
                          <td>{row.date}</td>
                          <td><span className={`profile-status-badge ${getEnrollmentStatusClass(row.status)}`}>{row.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="profile-pagination">
                    <button type="button" className="profile-page-btn" disabled={currentPage <= 1} onClick={() => setEnrollmentPage((p) => Math.max(1, p - 1))}>السابق</button>
                    <span className="profile-page-info">صفحة {currentPage} من {totalPages}</span>
                    <button type="button" className="profile-page-btn" disabled={currentPage >= totalPages} onClick={() => setEnrollmentPage((p) => p + 1)}>التالي</button>
                  </div>
                )}
              </>
            )}
          </section>

          {/* قسم المتاح — كورسات للاكتشاف */}
          <section className="profile-section">
            <h3 className="section-title-new"><Compass /> كورسات متاحة للاشتراك</h3>
            {popularLoading ? (
              <p className="profile-muted">جاري التحميل...</p>
            ) : popularCourses?.length ? (
              <div className="profile-courses-grid profile-courses-grid--small">
                {popularCourses.slice(0, 4).map((course) => (
                  <Link to={`/course/${course.id}`} className="profile-course-card" key={course.id}>
                    <div className="profile-course-img-wrap">
                      <img
                        src={course.thumbnail_url?.startsWith("http") ? course.thumbnail_url : "/imges/coding.png"}
                        alt={course.title}
                        onError={(e) => { e.target.src = "/imges/coding.png"; }}
                      />
                    </div>
                    <div className="profile-course-info">
                      <h4>{course.title}</h4>
                      <span className="profile-course-go"><ChevronLeft /> عرض الكورس</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
            <div className="profile-explore-cta">
              <Link to="/" className="profile-link-btn">اكتشف كل الكورسات</Link>
            </div>
          </section>

          {/* قسم تغيير كلمة المرور */}
          <section className="profile-section">
            <h3 className="section-title-new"><Lock /> تغيير كلمة السر</h3>
            <form className="password-form" onSubmit={handleChangePasswordSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="currentPassword">كلمة السر الحالية</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">كلمة السر الجديدة</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">تأكيد كلمة السر الجديدة</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-submit-password">حفظ التغييرات</button>
            </form>
          </section>

          {/* قسم تسجيل الخروج */}
          <section className="profile-section">
            <h3 className="section-title-new"><LogOut /> تسجيل الخروج</h3>
            <p>هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟</p>
            <button onClick={handleLogout} className="btn-logout">
              تسجيل الخروج
            </button>
          </section>

        </main>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;