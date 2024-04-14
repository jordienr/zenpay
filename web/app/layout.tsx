import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Zenpay",
  description: "The fastest way to add subscriptions to your app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={""}>
      <body className="">
        <main className="min-h-screen max-w-2xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
