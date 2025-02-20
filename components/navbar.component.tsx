import { Add, Lightbulb } from "@mui/icons-material";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const IdeaNavbar: React.FC = () => {
  const { data: session } = useSession();
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <h1 className="font-medium ml-auto">
          <Lightbulb />
          Idéa
        </h1>
        <nav className="ml-auto text-sm font-medium space-x-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          {!session?.user && <Link href="sign-in">Accedi</Link>}
          {session?.user && (
            <Link href="/" onClick={handleLogout}>
              Logout
            </Link>
          )}
          {session?.user && (
            <Link href="/post">
              <Add />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default IdeaNavbar;
