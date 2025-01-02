import { useSearchParams } from "react-router-dom";
import Select from "./Select";

// eslint-disable-next-line react/prop-types
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortValue}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
