import { useEffect, useState } from "react";
import { fetchData } from "../apis";
import { type PaginatorPageChangeEvent } from "primereact/paginator";
import { type DataType } from "../component/types";
import { ArtworkTable } from "../component/ArtworkTable";
import { CustomPaginator } from "../component/CustomPaginator";
import "./AssignmentPage.css";

function AssignmentPage() {
  const [data, setData] = useState<DataType[]>([]);
  const [first, setFirst] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<DataType[]>([]);
  const [noOfRowsToSelect, setNoOfRowsToSelect] = useState("");
  const [pagesToVisit, setPagesToVisit] = useState<number[]>([]);

  const handleFilter = (updatedPagesToVisit?: number[]) => {
    const currentRows = parseInt(noOfRowsToSelect);
    const pagesToCheck = updatedPagesToVisit || pagesToVisit;

    const remainingRows = currentRows - (currentPage - 1) * 12;
    if (
      remainingRows <= 0 || (
      pagesToCheck.length === 0 ||
      !pagesToCheck.includes(currentPage) )||
      !noOfRowsToSelect
    ) {
      return;
    }

    // setNextSelectedPage(currentPage + 1);
    // visitedPages.add(currentPage);
    setPagesToVisit((prevPages) => {
      const copy = prevPages.filter((page) => page !== currentPage);
      return copy;
    });
    const selectedRows = Array.from(
      { length: remainingRows },
      (_, index) => index
    );
    setSelectedProducts((prevSelected) => {
      const newItems = data.filter((_, index) => selectedRows.includes(index));
      const filteredNewItems = newItems.filter(
        (newItem) =>
          !prevSelected.some((existing) => existing.id === newItem.id)
      );
      return [...prevSelected, ...filteredNewItems];
    });
  };

  const formatTitle = (title: string) => {
    if (title.startsWith("Untitled (")) {
      const match = title.match(/Untitled \(([^;)]+)/);
      return match ? match[1] : title;
    }
    return title;
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchData(1);
      setTotal(response.data.pagination.total);
      setData(response.data.data);
    };
    loadData();
  }, []);
  useEffect(() => {
    handleFilter();
  }, [currentPage]);


  const onPageChange = async (e: PaginatorPageChangeEvent) => {
    const res = await fetchData(e.page + 1);
    setCurrentPage(e.page + 1);
    setData(res.data.data);
    setFirst(e.first);
  };
  return (
    <div style={{ padding: "20px" }}>
      <ArtworkTable
        data={data}
        setPagesToVisit={setPagesToVisit}
        selectedProducts={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        formatTitle={formatTitle}
        noOfRowsToSelect={noOfRowsToSelect}
        setNoOfRowsToSelect={setNoOfRowsToSelect}
        handleSubmit={(updatedPages?: number[]) => handleFilter(updatedPages)}
      />
      <CustomPaginator
        first={first}
        total={total}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default AssignmentPage;
