import { Paginator, type PaginatorPageChangeEvent } from "primereact/paginator";

interface CustomPaginatorProps {
  first: number;
  total: number;
  onPageChange: (e: PaginatorPageChangeEvent) => void;
}

export const CustomPaginator = ({
  first,
  total,
  onPageChange,
}: CustomPaginatorProps) => {
  return (
    <Paginator
      first={first}
      rows={12}
      totalRecords={total}
      onPageChange={onPageChange}
      style={{
        marginTop: "20px",
        width: "90vw",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        color: "red",
      }}
      pt={{
        // root:{
        //   className:"top-5 py-4 bg-green-400",

        // },
        firstPageIcon: {
          className:
            "h-8  w-8 p-2 hover:bg-gray-300 hover:rounded-full hover:text-black m-3 flex items-center justify-center",
        },
        lastPageIcon: {
          className:
            "h-8  w-8 p-2 hover:bg-gray-300 hover:rounded-full hover:text-black m-3 flex items-center justify-center",
        },
        prevPageIcon: {
          className:
            "h-8  w-8 p-2 hover:bg-gray-300 hover:rounded-full hover:text-black m-3 flex items-center justify-center",
        },
        nextPageIcon: {
          className:
            "h-8  w-8 p-2 hover:bg-gray-300 hover:rounded-full hover:text-black m-3 flex items-center justify-center",
        },
        firstPageButton: {
          className:
            "w-8 h-8  text-gray-600 rounded-full font-semibold text-black mx-2 min-w-max  flex items-center justify-center",
        },
        lastPageButton: {
          className:
            "w-8 h-8  text-gray-600 rounded-full font-semibold text-black mx-2 min-w-max  flex items-center justify-center",
        },
        prevPageButton: {
          className:
            "w-8 h-8   text-gray-600 rounded-full font-semibold text-black mx-2 min-w-max  flex items-center justify-center",
        },
        nextPageButton: {
          className:
            "w-8 h-8  text-gray-600 rounded-full font-semibold text-black mx-2 min-w-max  flex items-center justify-center",
        },
        pages: {
          className: "gap-4 max-w-[50vw] flex justify-between mx-4",
        },
        pageButton: (options) => {
          const isActive = options!.context.active;
          return {
            className: `h-8 w-8 hover:bg-green-300 text-xl  hover:text-gray-600 rounded-full font-semibold text-black mx-2 min-w-max  flex items-center justify-center ${
              isActive ? "text-blue-500 bg-blue-400 rounded-full " : ""
            }`,
          };
        },
      }}
    />
  );
};
