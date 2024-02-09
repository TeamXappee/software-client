import React, { useEffect } from "react";
import { Dot } from "lucide-react";

export default function ChannelsMetadata({
  channelIds,
  dateRange,
}: {
  channelIds: number[];
  dateRange: { from: string; to: string };
}) {
  const [channels, setChannels] = React.useState<any[]>([]);

  const FormatDateRange = () => {
    if (dateRange) {
      return (
        <p className="text-muted-foreground font-semibold"> Date: {" "} 
          {new Date(dateRange.from).toLocaleDateString()} ~{" "}
          {new Date(dateRange.to).toLocaleDateString()}
        </p>
      );
    }
    return "";
  };

  useEffect(() => {
    const fetchChannels = async () => {
      if (!channelIds) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/channels/with-id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ channelIds }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          setChannels(data);
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchChannels();
  }, [channelIds]);

  return (
    <div>
      <FormatDateRange />
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {channels.map((channel) => (
          <div className="bg-secondary p-3 flex gap-1 rounded-2xl">
            <Dot className=" text-green-500" />
            <p>
              {channel.name} | {channel.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
