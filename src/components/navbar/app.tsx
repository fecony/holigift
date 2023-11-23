import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";
import { SignOutButton } from "@clerk/nextjs";
import Navbar from "@/components/navbar";

export default function AppNavbar() {
  return (
    <Navbar>
      <SignOutButton>
        <Button variant="outline" size="icon">
          <IconLogout size={19} />
        </Button>
      </SignOutButton>
    </Navbar>
  );
}
