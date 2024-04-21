import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { BsStripe } from "react-icons/bs";
import { TbSdk } from "react-icons/tb";

export default async function Index() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  const features = [
    {
      icon: <TbSdk />,
      title: "TypeScript SDK",
      description:
        "Use our TypeScript SDK to check subscription status easily in your app.",
    },
    {
      icon: <BsStripe />,
      title: "Stripe Syncing",
      description:
        "Zenpay will sync your Stripe subscriptions and customers automatically.",
    },
  ];

  return (
    <div className="">
      <nav className="flex justify-between p-4">
        <Link className="font-bold tracking-tight" href="/">
          Zenpay
        </Link>
        <div>
          {user.user ? (
            <>
              <Link
                className="p-2 px-3 text-xs font-medium tracking-tight text-zinc-800 rounded-full bg-white"
                href="/projects"
              >
                Projects
              </Link>
            </>
          ) : (
            <>
              <Link
                className="p-2 px-3 text-xs font-medium tracking-tight text-zinc-800 rounded-full bg-white"
                href="/login"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="px-4 py-24 text-center">
        <h1 className="text-4xl tracking-tight font-medium">
          The fastest way to add
          <br /> subscriptions to your app
        </h1>

        <p className="mt-4 text-zinc-600">
          Zenpay gives you an easy to use <br />
          API and SDK to add subscriptions to your app in minutes.
        </p>
        <div className="mt-8">
          <h2 className="text-xs font-bold font-mono">Features</h2>
        </div>

        <ul className="grid justify-center">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex mt-4 max-w-md bg-white p-2 px-4 rounded-lg shadow-sm"
            >
              <div className="mr-4 mt-1 text-2xl">{feature.icon}</div>
              <div className="text-sm text-left">
                <p className="font-medium">{feature.title}</p>
                <p className="text-zinc-600">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
