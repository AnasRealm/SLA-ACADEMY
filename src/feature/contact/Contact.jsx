import React from "react";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";
import MainLayout from "../../shared/layout/MainLayout";
import "./Contact.css";

const Contact = () => {
  return (
    <MainLayout>
      <div className="contact-container">
        <div className="contact-header">
          <h1>تواصل معنا</h1>
          <p>نحن هنا لمساعدتك في رحلتك التعليمية</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} />
                </div>
                <div className="contact-details">
                  <h3>رقم الهاتف</h3>
                  <p>+963 968 364 986</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-details">
                  <h3>البريد الإلكتروني</h3>
                  <a
                    href="mailto:ramaalbanialmorahli@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    ramaalbanialmorahli@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={24} />
                </div>
                <div className="contact-details">
                  <h3>العنوان</h3>
                  <p>دمشق، سوريا مواجه كليه الاقتصاد ضمن مركز الوردي للتدريب</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Facebook size={24} />
                </div>
                <div className="contact-details">
                  <h3>فيسبوك</h3>
                  <a
                    href="https://www.facebook.com/share/1C1AMLRQgW/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    SL Academy
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-map">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.699695370277!2d36.287124024367856!3d33.5091894733664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e0b5f3932433%3A0xc37aea1ab8783e6a!2z2YPZhNmK2Kkg2KfZhNil2YLYqti12KfYryAtINis2KfZhdi52Kkg2K_Zhdi02YI!5e0!3m2!1sar!2s!4v1769601357483!5m2!1sar!2s"
                width="100%"
                height="550"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع SL Academy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
