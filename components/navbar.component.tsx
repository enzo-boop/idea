import {
  AddOutlined,
  DoorBackOutlined,
  DoorFrontOutlined,
  ExploreOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { IconButton, Tooltip } from "@mui/material";

const IdeaNavbar: React.FC = () => {
  const { data: session } = useSession();
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <nav className="ml-auto text-sm font-medium space-x-6">
          <IconButton>
            <Link href="/">
              <Tooltip title="Esplora" arrow>
                <ExploreOutlined />
              </Tooltip>
            </Link>
          </IconButton>
          <IconButton>
            <Link href="/about">
              <Tooltip title="Chi sono" arrow>
                <InfoOutlined />
              </Tooltip>
            </Link>
          </IconButton>
          {!session?.user && (
            <IconButton>
              <Link href="sign-in">
                <Tooltip title="Accedi" arrow>
                  <DoorFrontOutlined />
                </Tooltip>
              </Link>
            </IconButton>
          )}
          {session?.user && (
            <IconButton>
              <Link href="/" onClick={handleLogout}>
                <Tooltip title="Esci" arrow>
                  <DoorBackOutlined />
                </Tooltip>
              </Link>
            </IconButton>
          )}
          {session?.user && (
            <IconButton>
              <Link href="/post">
                <Tooltip title="Crea post" arrow>
                  <AddOutlined />
                </Tooltip>
              </Link>
            </IconButton>
          )}
        </nav>
      </div>
    </header>
  );
};

export default IdeaNavbar;
