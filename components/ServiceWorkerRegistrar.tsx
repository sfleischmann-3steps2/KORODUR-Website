"use client";

import { useEffect } from "react";
import { basePath } from "../lib/basePath";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Im Dev keinen Service Worker: sonst liefert der gecachte Chunks aus und
    // man sieht trotz Neubau alten Code. Zusätzlich evtl. vorhandene
    // Registrierungen abräumen (Selbstheilung für bereits "verklebte" Browser).
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister()))
        .catch(() => {});
      return;
    }

    navigator.serviceWorker.register(`${basePath}/sw.js`).catch(() => {
      // SW registration failed silently – non-critical
    });
  }, []);

  return null;
}
