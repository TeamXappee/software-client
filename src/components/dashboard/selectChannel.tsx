import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IChannel } from "@/types/channel";

interface SelectChannelProps {
  channels: IChannel[];
  selectedChannelIds: number[];
  setSelectedChannelIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export function SelectChannel({
  channels,
  selectedChannelIds,
  setSelectedChannelIds,
}: SelectChannelProps): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleChannelSelection = (channelId: number): void => {
    setSelectedChannelIds((currentSelectedIds) =>
      currentSelectedIds.includes(channelId)
        ? currentSelectedIds.filter((id) => id !== channelId)
        : [...currentSelectedIds, channelId]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between "
        >
          {selectedChannelIds.length > 0
            ? `${selectedChannelIds.length} channels selected`
            : "Select channel"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 overflow-y-auto max-h-[70vh]">
        <Command>
          <CommandInput placeholder="Search channel..." className="h-9" />
          <CommandEmpty>No channel found.</CommandEmpty>
          <CommandGroup>
            {channels.map((channel) => (
              <CommandItem
                key={channel.channel_id}
                value={channel.channel_id.toString()}
                onSelect={() => toggleChannelSelection(channel.channel_id)}
                className="text-sm"
              >
                {channel.name}
                <span className="text-muted-foreground">{`(${channel.type})`}</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedChannelIds.includes(channel.channel_id)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
