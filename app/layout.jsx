import { Orbitron } from "@next/font/google";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StoreProvider from "./components/StoreProvider";
import SessionProvider from "./components/SessionProvider";

// If loading VARIABLE font, no need to specify the font weight
export const orbitron = Orbitron({
  variable: "--font-orbitron",
});

// Container sets this: sm (640px)	max-width: 640px;
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable}`}
      // suppressHydrationWarning={true}
    >
      <body className="flex flex-col justify-between min-h-screen">
        <SessionProvider>
          <StoreProvider>
            <Header />
            <main className="container m-auto mt-4 px-4">{children}</main>
            <Footer />
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
