import { Orbitron } from "@next/font/google";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";
import StoreProvider from "./utils/storeProvider";

// If loading VARIABLE font, no need to specify the font weight
export const orbitron = Orbitron({
  variable: "--font-orbitron",
});

// Container sets this: sm (640px)	max-width: 640px;
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable}`}>
      <body className="flex flex-col justify-between min-h-screen">
        <StoreProvider>
          <Header />
          <main className="container m-auto mt-4 px-4">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
