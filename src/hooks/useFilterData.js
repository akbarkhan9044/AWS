import { useState, useMemo } from "react";

export function useFilterData(items = []) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const name = item.title || item.name || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    result.sort((a, b) => {
      const nameA = (a.title || a.name || "").toLowerCase();
      const nameB = (b.title || b.name || "").toLowerCase();
      if (sortOrder === "asc") return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    });

    return result;
  }, [items, searchTerm, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return {
    searchTerm,
    setSearchTerm,
    sortOrder,
    toggleSortOrder,
    filteredItems,
  };
}
