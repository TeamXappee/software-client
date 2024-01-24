import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid w-full h-[85vh] place-content-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
