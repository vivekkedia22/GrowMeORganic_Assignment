import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

interface TitleHeaderProps {
  noOfRowsToSelect: string;
  setNoOfRowsToSelect: (value: string) => void;
  handleSubmit: () => void;
}

export const TitleHeader = ({
  noOfRowsToSelect,
  setNoOfRowsToSelect,
  handleSubmit,
}: TitleHeaderProps) => {
  const overlayRef = useRef<OverlayPanel>(null);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <i
        className="pi pi-chevron-down"
        style={{
          cursor: "pointer",
          height: "12px",
          width: "12px",
          backgroundColor: "white",
        }}
        onClick={(e) => overlayRef.current?.toggle(e)}
      ></i>
      <span>Title</span>
      <OverlayPanel ref={overlayRef}>
        <div
          style={{
            padding: "10px",
            display: "flex",
            backgroundColor: "white",
            border: "1px solid black",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <InputText
            value={noOfRowsToSelect}
            className="w-full border-2"
            onChange={(e) => setNoOfRowsToSelect(e.target.value)}
            placeholder="Enter rows to select..."
            style={{ width: "200px" }}
          />
          <Button
            label="Submit"
            onClick={() => {
              handleSubmit();
              overlayRef.current?.hide();
            }}
            size="small"
            className="bg-gray-400 rounded-lg w-1/2 self-center"
          />
        </div>
      </OverlayPanel>
    </div>
  );
};
