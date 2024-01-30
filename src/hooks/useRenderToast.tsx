import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const useRenderToast = (
  message: string,
  type: "loading" | "success" | "error"
) => {
  const content = (
    <p className="flex gap-2 items-center">
      {type === "loading" && <Loader2 className="animate-spin" size={15} />}
      {message}
    </p>
  );
  toast[type === "loading" ? "info" : type](content);
};
