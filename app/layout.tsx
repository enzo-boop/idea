"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ToastProvider } from "./contexts/toast.context";
import { SessionProvider } from "next-auth/react";
import IdeaNavbar from "@/components/navbar.component";
import IdeaSnackbar from "@/components/snackbar.component copy";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </head>
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        <SessionProvider>
          <ToastProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="max-w-2xl mx-auto py-10 px-4">
                <IdeaNavbar/>
                <main>{children}</main>
              </div>
              <IdeaSnackbar />
              <Analytics />
            </ThemeProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
