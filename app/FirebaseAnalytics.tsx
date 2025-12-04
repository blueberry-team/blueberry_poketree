"use client";

import { useEffect } from "react";
import { analytics } from "@/features/shared/utils/firebase/firebase";

export function FirebaseAnalytics() {
  useEffect(() => {
    if (analytics) {
      console.log("Firebase Analytics initialized");
    }
  }, []);

  return null;
}
