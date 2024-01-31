import { AlertTriangle } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function Warning({
  warning,
  setWarnings,
}: {
  warning?: any;
  setWarnings: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <AlertTriangle size={15} className="text-yellow-500 relative -top-[1px]" />
  );
}
