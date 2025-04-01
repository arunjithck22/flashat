"use client";

import SignIn from "./components/signIn/SignIn";
import { AuthFilterProvider } from "@/contexts/authetication/AuthFilterContext";
const Authentication=()=> {
  return (
    <section>
      <AuthFilterProvider>
        <SignIn />
      </AuthFilterProvider>
    </section>
  );
}

export default Authentication
