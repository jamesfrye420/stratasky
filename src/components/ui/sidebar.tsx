import * as React from "react";
import {
  Cross1Icon,
  HamburgerMenuIcon,
  MinusIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Experiments</SheetTitle>
        </SheetHeader>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
