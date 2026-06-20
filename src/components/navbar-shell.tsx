import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "./navbar";

export async function NavbarShell() {
  const user = await getCurrentUser();

  return (
    <Navbar streak={user?.streak ?? 0} points={user?.points ?? 0} />
  );
}