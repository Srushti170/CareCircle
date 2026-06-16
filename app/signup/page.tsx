import { Suspense } from "react";

import { SignupPageClient } from "@/components/signup-page-client";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupPageClient />
    </Suspense>
  );
}
