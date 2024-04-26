import * as React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./separator";
import Link from "next/link";

export function SideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Experiments</SheetTitle>
          <Separator />
        </SheetHeader>

        <div className="mt-10">
          <Link href={"/specific-gravity"}>Specific Gravity</Link>
        </div>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
