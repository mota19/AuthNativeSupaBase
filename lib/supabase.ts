import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `https://nvbfkifzkgkpoguzlgmb.supabase.co`;
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52YmZraWZ6a2drcG9ndXpsZ21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNDY3NTUsImV4cCI6MjA0MTcyMjc1NX0.m68NloDXO4l2wjQ02CGox1_RPHtC2m_4bY-YOzYk6AM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
