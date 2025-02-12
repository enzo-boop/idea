import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { Home, InfoSharp, Key, Light, Lightbulb } from "@mui/icons-material";


export const metadata = {
  title: "Idéa",
  description: "Personal space",
};

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <h1 className="font-medium ml-auto">
                  <Lightbulb/>
                  Idéa
                </h1>
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">
                  Home
                  </Link>
                  <Link href="/about">
                  About
                  </Link>
                  <Link href="/sign-in">
                  Accedi
                  </Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
