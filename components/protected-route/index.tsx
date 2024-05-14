import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, error, user, loginWithRedirect } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !error && !isAuthenticated) {
      loginWithRedirect({
        authorizationParams: {
          screen_hint: "login",
          ui_locales: 'zh-CN',
          redirect_uri: typeof window !== 'undefined' ? window.location.href : '',
        },
        openUrl(url) {
          router.push(url);
        },
      });
    } else if (user?.sub?.includes("auth0") && !user?.email_verified) {
      router.push("/auth/verify-email");
    }
  }, [isLoading, isAuthenticated, router, error, user, loginWithRedirect]);

  if (isLoading) {
    return "loading";
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // unverified email or unauthenticated
  if (
    !isAuthenticated ||
    (user?.sub?.includes("auth0") && !user?.email_verified)
  ) {
    return null;
  }

  return children;
}
