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
import { CreateDeckForm } from "./create-deck-form";

export function CreateDeckDrawer() {
  // createDeck redirects on success → navigation closes the drawer automatically.
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>
        <Plus className="size-4" /> Tạo bộ thẻ
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-md flex-col">
          <DrawerHeader>
            <DrawerTitle>Tạo bộ thẻ mới</DrawerTitle>
            <DrawerDescription>
              Đặt tên và bắt đầu thêm từ vựng.
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <CreateDeckForm />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
