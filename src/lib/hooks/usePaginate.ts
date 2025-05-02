import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const usePaginate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useMemo(() => {
    return searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  }, [searchParams]);

  const setCurrentPage = useCallback(
    (num: number) => {
      setSearchParams((params) => {
        params.set("page", num.toString());

        return params;
      });
    },
    [setSearchParams]
  );

  return {
    currentPage,
    setCurrentPage,
  };
};
