import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: "Earth Unfolded | Climate Change Visualization",
  description: "An interactive journey through Earth's history and the impact of climate change",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
