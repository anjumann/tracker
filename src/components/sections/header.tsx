"use client";

import { APP_NAME } from "@/constant";
import { ModeToggle } from "@/components/sections/mode-toggle";
import Link from "next/link";
import {
  ListChecks
} from "lucide-react";


export default function Header() {


  return (
    <header className="container mx-auto border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <ListChecks className="h-6 w-6" />
          <Link href="/" className="text-lg font-bold">
            {APP_NAME}
          </Link>
        </div>




        <div className="flex items-center gap-2">
          <ModeToggle />
          User btn
        </div>
      </div>
    </header>
  );
} 