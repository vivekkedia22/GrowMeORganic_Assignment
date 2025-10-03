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
  // const [nextSelectedPage, setNextSelectedPage] = useState(1);

  const handleFilter = () => {
    // if (nextSelectedPage < currentPage || !noOfRowsToSelect) {
    //   return;
    // }
    const currentRows = parseInt(noOfRowsToSelect);

    const remainingRows = currentRows - (currentPage - 1) * 12;
    console.log("Remaining rows ", remainingRows);
    if (remainingRows <= 0) return;
    // setNextSelectedPage(currentPage + 1);
    // setNoOfRowsToSelect(remainingRows < 0 ? "0" : remainingRows.toString());
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
        selectedProducts={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        formatTitle={formatTitle}
        noOfRowsToSelect={noOfRowsToSelect}
        setNoOfRowsToSelect={setNoOfRowsToSelect}
        handleSubmit={handleFilter}
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
