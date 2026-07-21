"use client";

import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { AddCardForm } from "./add-card-form";

export function AddCardDrawer({ deckId }: { deckId: string }) {
  // Stays open after each add (toast confirms) so you can add many cards quickly.
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>
        <Plus className="size-4" /> Thêm thẻ
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-md flex-col">
          <DrawerHeader>
            <DrawerTitle>Thêm thẻ mới</DrawerTitle>
            <DrawerDescription>
              Thêm xong 1 thẻ, cứ tiếp tục thêm thẻ khác.
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <AddCardForm deckId={deckId} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
