import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import { dark } from "@clerk/themes";
import { checkUser } from "../lib/checkUser"; // Import checkUser here

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default async function RootLayout({ children }) {
  const user = await checkUser(); // Fetch user data on the server

  return (
    <html lang="en" suppressHydrationWarning>
     <ClerkProvider appearance={{ baseTheme: dark }}>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header user={user} /> {/* Pass user data to Header */}
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with 💗 by RoadsideCoder</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}