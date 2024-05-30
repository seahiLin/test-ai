import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Auth0Wrapper from "@/lib/auth0";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Eve Ai",
  description: "Eve",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Auth0Wrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            // disableTransitionOnChange
          >
            {children}
            {modal}
          </ThemeProvider>
        </Auth0Wrapper>
        <Toaster />
      </body>
    </html>
  );
}
