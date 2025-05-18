/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

export default function PrivateRoute({ children }) {
 const { user } = useAuth();

 if (!user) {
  // لو المستخدم مش مسجل دخول → نرجعه لصفحة تسجيل الدخول
  return <Navigate to="/login" replace />;
 }

 // لو مسجل دخول → نعرض الصفحة المطلوبة
 return children;
}
