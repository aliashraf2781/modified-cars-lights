import { useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";

function App() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && (lang === "en" || lang === "ar")) {
      i18n.changeLanguage(lang);
      document.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  // Validate language parameter
  if (!lang || (lang !== "en" && lang !== "ar")) {
    return <Navigate to="/ar" replace />;
  }

  return <Outlet />;
}

export default App;
