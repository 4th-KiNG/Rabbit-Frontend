import { useMemo } from "react";
import { usePaginate } from "../../../lib/hooks/usePaginate";
import { Pagination as PaginationUI } from "@nextui-org/react";
import { generateOrderedArray } from "../../../utils/posts.utils";

interface PaginationProps {
  total: number;
}

const Pagination = (props: PaginationProps) => {
  const { total } = props;
  const { currentPage, setCurrentPage } = usePaginate();
  const postsPaginate = useMemo(() => {
    return generateOrderedArray(total);
  }, [total]);

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
