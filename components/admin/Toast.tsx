"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

type Variant = "ok" | "err";
type ToastState = { msg: string; variant: Variant } | null;

let setter: ((t: ToastState) => void) | null = null;

export function showToast(msg: string, variant: Variant = "ok") {
  if (setter) setter({ msg, variant });
}

export default function Toast() {
  const [t, setT] = useState<ToastState>(null);
  useEffect(() => {
    setter = setT;
    return () => {
      setter = null;
    };
  }, []);
  useEffect(() => {
    if (!t) return;
    const id = setTimeout(() => setT(null), 2400);
    return () => clearTimeout(id);
  }, [t]);
  if (!t) return null;
  return (
    <div className={`toast ${t.variant}`} role="status">
      {t.variant === "ok" ? <CheckCircle2 /> : <AlertTriangle />}
      {t.msg}
    </div>
  );
}
