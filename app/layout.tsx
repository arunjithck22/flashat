import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { OnlineStatusProvider } from "@/contexts/OnlineStatusContext";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { ClientSecretProvider } from "@/contexts/buy-flix-coins/ClientSecretProvider";
import { SignUpProvider } from "@/contexts/authetication/SignUpContext";
import "intl-tel-input/build/css/intlTelInput.css";


const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Flashat",
  description: "",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const dir = locale === "ar" ? "rtl" : "ltr";

  const messages = await getMessages();
  return (
    <html lang={locale} dir={dir}>
      <body className={lato.className}>
        <LanguageProvider>
          <ClientSecretProvider>
            <ReactQueryProvider>
              <LanguageProvider>
                <OnlineStatusProvider>
                  <AuthProvider>
                    <SocketProvider>
                      <ProfileProvider>
                        <GoogleOAuthProvider
                          clientId={
                            process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!
                          }
                        >
                          <NextIntlClientProvider messages={messages}>
                            <SignUpProvider>
                            {children} 
                            </SignUpProvider>

                            <ToastContainer />
                          </NextIntlClientProvider>
                        </GoogleOAuthProvider>
                      </ProfileProvider>
                    </SocketProvider>
                  </AuthProvider>
                </OnlineStatusProvider>
              </LanguageProvider>
            </ReactQueryProvider>
          </ClientSecretProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
