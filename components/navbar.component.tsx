import {
  Add,
  AddOutlined,
  DoorBack,
  DoorBackOutlined,
  DoorFront,
  DoorFrontOutlined,
  Home,
  InfoOutlined,
  Lightbulb,
} from "@mui/icons-material";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IconButton } from "@mui/material";

const IdeaNavbar: React.FC = () => {
  const { data: session } = useSession();
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <a
          className="font-medium ml-auto"
          href="/"
          style={{ textDecoration: "none" }}
        >
          <Lightbulb
            sx={{ color: "#ffd900", filter: "drop-shadow(0px 0px 1px black)" }}
          />
          Idéa
        </a>
        <nav className="ml-auto text-sm font-medium space-x-6">
          <IconButton>
            <Link href="/about">
              <InfoOutlined />
            </Link>
          </IconButton>
          {!session?.user && (
            <IconButton>
              <Link href="sign-in">
              <DoorFrontOutlined/>
              </Link>
            </IconButton>
          )}
          {session?.user && (
            <IconButton>
              <Link href="/" onClick={handleLogout}>
              <DoorBackOutlined />
              </Link>
            </IconButton>
          )}
          {session?.user && (
            <IconButton>
              <Link href="/post">
                <AddOutlined />
              </Link>
            </IconButton>
          )}
        </nav>
      </div>
    </header>
  );
};

export default IdeaNavbar;
