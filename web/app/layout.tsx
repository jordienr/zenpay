import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FaUserAstronaut } from "react-icons/fa";
import "./globals.css";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Zenpay",
  description: "The fastest way to add subscriptions to your app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supa = createClient();
  const user = await supa.auth.getUser();

  return (
    <html lang="en" className={""}>
      <body className="">
        <div className="bg-white">
          <header className="max-w-2xl mx-auto flex items-center justify-between px-4 py-2">
            <Link
              href="/projects"
              className="font-bold tracking-tight flex items-center text-zinc-800"
            >
              <span className="text-2xl mr-1">✌️</span>
              <span>Zenpay</span>
              <span className="font-mono text-xs mx-2 text-orange-500">
                BETA
              </span>
            </Link>
            <nav>
              <Link
                href="/projects"
                className="flex text-sm tracking-tight text-zinc-800 p-2 border rounded-full hover:bg-white transition-all"
              >
                <FaUserAstronaut size="18" />
              </Link>
            </nav>
          </header>
        </div>

        <main className="">{children}</main>
        <footer className="text-center py-12 text-sm text-zinc-600 font-mono tracking-tighter">
          Zenpay Beta
        </footer>
      </body>
    </html>
  );
}
