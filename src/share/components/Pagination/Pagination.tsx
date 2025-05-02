import { useMemo } from "react";
import { usePaginate } from "../../../lib/hooks/usePaginate";
import { Pagination as PaginationUI } from "@nextui-org/react";

const Pagination = () => {
  const { currentPage, setCurrentPage } = usePaginate();
  const postsPaginate = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }, []);

  return (
    <div className="flex items-center justify-center flex-wrap gap-3">
      <PaginationUI
        initialPage={currentPage}
        size="md"
        total={postsPaginate.length}
        onChange={(page) => {
          setCurrentPage(page);
          const createArea = document.querySelector(".createArea");
          if (createArea) createArea.scrollIntoView({ behavior: "smooth" });
        }}
        classNames={{ cursor: "bg-[#CE3333]" }}
        siblings={2}
      />
    </div>
  );
};

export default Pagination;
