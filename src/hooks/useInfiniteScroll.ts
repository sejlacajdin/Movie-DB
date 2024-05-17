import { RefObject, useCallback, useEffect, useState } from "react";

export const useInfiniteScroll = (
  { current }: RefObject<HTMLDivElement>,
  hasMore: boolean
) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    current?.addEventListener("scroll", handleScroll);
    return () => current?.removeEventListener("scroll", handleScroll);
  }, [current]);

  const handleScroll = useCallback(() => {
    const endOfScroll =
      current &&
      window.innerHeight + current?.scrollTop + 50 >= current?.scrollHeight;
    if (!endOfScroll || isFetching || !hasMore) return;
    setIsFetching(true);
  }, [hasMore, isFetching, current]);

  return [isFetching, setIsFetching] as const;
};
