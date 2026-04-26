"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import AuthCard from "@/components/AuthCard";
import GoogleButton from "@/components/GoogleButton";
import AuthDivider from "@/components/AuthDivider";
import EmailForm from "@/components/EmailForm";
import Link from "next/link";

export default function SignupPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isGoogleLoading] = useState(false);
  const [referrer, setReferrer] = useState("/");
    const searchParams = useSearchParams();

    useEffect(() => {
    // Get referrer from query param or localStorage or document.referrer
    const redirectUrl = searchParams.get("redirect") || localStorage.getItem("postLoginRedirect") || null;
    if (redirectUrl) {
      setReferrer(redirectUrl);
    } else if (typeof document !== "undefined") {
      // Fallback: extract path from document.referrer if on same domain
      try {
        const ref = document.referrer;
        if (ref && ref.includes(window.location.hostname)) {
          const url = new URL(ref);
          setReferrer(url.pathname + url.search);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(referrer);
    }
  }, [isAuthenticated,referrer, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] py-12 px-4 sm:px-6 md:px-8">
      <AuthCard
        title="Create an account"
        subtitle="Join us — create your account to get started"
      >
        <div className="flex flex-col gap-6">
          <GoogleButton isLoading={isGoogleLoading} />
          <AuthDivider />
          <EmailForm />

          <div className="text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
