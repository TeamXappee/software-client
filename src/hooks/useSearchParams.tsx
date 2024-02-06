import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Custom hook to manage URL search parameters
export const useParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, undefined);
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`, undefined);
  };

  const getParam = (key: string) => {
    return searchParams.get(key) || "";
  };

  return { setParam, removeParam, getParam };
};
