"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import AuthCard from "@/components/AuthCard";
import GoogleButton from "@/components/GoogleButton";
import AuthDivider from "@/components/AuthDivider";
import EmailForm from "@/components/EmailForm";
import Link from "next/link";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isGoogleLoading] = useState(false);
  

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] py-12 px-4 sm:px-6 md:px-8">
      <AuthCard
        title="Sign in to App"
        subtitle="Welcome back! Please sign in to continue"
      >
        <div className="flex flex-col gap-6">
          <GoogleButton isLoading={isGoogleLoading} />
          <AuthDivider />
          <EmailForm/>

          <div className="text-center text-sm text-gray-600">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
