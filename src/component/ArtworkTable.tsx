import {
  DataTable,
  type DataTableSelectionMultipleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { type DataType } from "./types";
import { TitleHeader } from "./TitleHeader";

interface ArtworkTableProps {
  data: DataType[];
  selectedProducts: DataType[];
  setPagesToVisit: (value: number[]) => void;
  onSelectionChange: (
    e: DataTableSelectionMultipleChangeEvent<DataType[]>
  ) => void;
  formatTitle: (title: string) => string;
  noOfRowsToSelect: string;
  setNoOfRowsToSelect: (value: string) => void;
  handleSubmit: () => void;
}

export const ArtworkTable = ({
  data,
  selectedProducts,
  setPagesToVisit,
  onSelectionChange,
  formatTitle,
  noOfRowsToSelect,
  setNoOfRowsToSelect,
  handleSubmit,
}: ArtworkTableProps) => {
  const extractDateFromArtist = (artistDisplay: string, isStart: boolean) => {
    const match = artistDisplay.match(/(\d{4})-(\d{4})/);
    if (match) {
      return isStart ? match[1] : match[2];
    }
    const singleMatch = artistDisplay.match(/(\d{4})/);
    return singleMatch ? singleMatch[1] : "";
  };

  const getDisplayDate = (rowData: DataType, isStart: boolean) => {
    const dateValue = isStart ? rowData.date_start : rowData.date_end;
    if (dateValue) return dateValue.toString();
    return extractDateFromArtist(rowData.artist_display, isStart);
  };
  return (
    <DataTable
      value={data}
      checkIcon={<i></i>}
      selection={selectedProducts}
      onSelectionChange={onSelectionChange}
      selectionMode="multiple"
      selectionPageOnly={false}
      dataKey="id"
      tableStyle={{ minWidth: "50rem" }}
      pt={{
        bodyRow: {
          className: "hover:bg-gray-100"
        }
      }}
    >
      <Column
        selectionMode="multiple"
        headerStyle={{
          width: "50px",
          maxHeight: "2vh",
          paddingRight: "12px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
        pt={{
          headerCheckbox: {
            icon: {
              className: "hidden",
            },
          },
          rowCheckbox: {
            icon: {
              children: <i></i>,
              content: "",
              defaultChecked: false,
            },
          },
        }}
        bodyStyle={{
          paddingRight: "12px",
          borderBottom: "1px solid #eee",
        }}
      ></Column>

      <Column
        field="title"
        style={{ width: "30%" }}
        body={(rowData) => formatTitle(rowData.title)}
        header={
          <TitleHeader
            noOfRowsToSelect={noOfRowsToSelect}
            setPagesToVisit={setPagesToVisit}
            setNoOfRowsToSelect={setNoOfRowsToSelect}
            handleSubmit={handleSubmit}
          />
        }
        headerStyle={{
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
        bodyStyle={{
          padding: "12px",
          borderBottom: "1px solid #eee",
        }}
      ></Column>
      <Column
        field="place_of_origin"
        header="Place of Origin"
        headerStyle={{
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
        style={{ width: "15%" }}
        bodyStyle={{
          padding: "12px",
          borderBottom: "1px solid #eee",
        }}
      ></Column>
      <Column
        field="artist_display"
        header="Artist Display"
        style={{ width: "35%" }}
        headerStyle={{
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
        
        bodyStyle={{
          padding: "12px",
          borderBottom: "1px solid #eee",
        }}
      ></Column>
      <Column
        field="date_start"
        header="Date Start"
        body={(rowData) => getDisplayDate(rowData, true)}
        style={{ width: "10%" }}
        headerStyle={{
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
        bodyStyle={{
          padding: "12px",
          borderBottom: "1px solid #eee",
        }}
      ></Column>
      <Column
        field="date_end"
        header="Date End"
        body={(rowData) => getDisplayDate(rowData, false)}
        style={{ width: "10%" }}
        headerStyle={{
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
        bodyStyle={{
          padding: "12px",
          borderBottom: "1px solid #eee",
        }}
      ></Column>
    </DataTable>
  );
};
