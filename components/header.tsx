import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export default function Header(){
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button variant="secondary" size="sm" animate>
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" animate>Get Started</Button>
                </Link>
              </div>
            </div>
          </header>
  )
};
