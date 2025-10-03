import axios from "axios";
export const fetchData = async (pageNo: number) => {
  return await axios.get(
    `https://api.artic.edu/api/v1/artworks?page=${pageNo}`
  );
};
