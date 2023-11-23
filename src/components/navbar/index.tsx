import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Holigift from "@/public/holigift.png";

export default function Navbar({ children }: { children?: ReactNode }) {
  return (
    <div className="container absolute top-6 flex items-center justify-between md:top-10">
      <Link href="/">
        <Image
          src={Holigift}
          alt="Holigift"
          width={50}
          height={50}
          loading="eager"
        />
      </Link>

      {children}
    </div>
  );
}
