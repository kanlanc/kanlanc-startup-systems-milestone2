import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { signedIn } = useSession({
    required: true,
    onUnauthenticated() {
      console.log("unauthenticated");
    },
  });

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-indigo-600">QUESTIONIFY</a>
            </Link>
          </div>
          <div className="flex items-center">
            {signedIn === "authenticated" && (
              <Link href="/app/home">
                <a className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Instructor Home
                </a>
              </Link>
            )}
          </div>
          <div className="flex items-center">
            {signedIn === "authenticated" ? (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
                onClick={signOut}
              >
                Sign out
              </button>
            ) : (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
                onClick={signIn}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;