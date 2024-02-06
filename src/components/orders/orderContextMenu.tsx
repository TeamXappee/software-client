import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";

export function OrderContextMenu({
  order,
  carriers,
}: {
  order: any;
  carriers: any[];
}) {
  return (
    <ContextMenuContent className="  w-44">
      <ContextMenuItem>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem disabled>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem className=" justify-between">
        <span>Reload {`(${order.selroOrderId})`}</span>
        <ReloadIcon fontSize={20} />
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Shipping Method</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          {carriers &&
            carriers.map((carrier) => (
              <ContextMenuSub key={carrier.id}>
                <ContextMenuSubTrigger>{carrier.name}</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  {carrier.services.map((service: any, i: number) => (
                    <ContextMenuItem key={i}>{service.name}</ContextMenuItem>
                  ))}
                </ContextMenuSubContent>
              </ContextMenuSub>
            ))}
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem className=" justify-between focus:bg-red-500/40 ">
        Move to trash <Trash2 size={15} />
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
