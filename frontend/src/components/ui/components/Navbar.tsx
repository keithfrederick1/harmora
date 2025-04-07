import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold">
        Harmora
      </Link>
      <div className="space-x-4">
        <Button variant="outline">Sign In</Button>
        <Button>Get Started</Button>
      </div>
    </nav>
  );
}
