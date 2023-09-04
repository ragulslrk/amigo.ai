"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
// import { MobileSidebar } from "@/components/mobile-sidebar";
import { ThemeToggler } from "@/components/themeToggler";
import { Button } from "@/components/ui/button";
// import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({ weight: "600", subsets: ["latin"] });
interface NavbarProps {
  isPro: boolean;
}

export const Navbar = () => {
  

  return ( 
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
       
        <Link href="/">
          <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-indigo-700", font.className)}>
            Amigo.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        
          <Button  size="sm" variant="premium">
            Upgrade
            <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        
        {/* <ThemeToggler /> */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}