import { useState, useEffect } from "react";
import ListItem from "./ListItem";

function List({ data, currentPage }) {
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 200); // Simulated loading delay
  }, [data]);

  const reversed = [...data].reverse();

  function pageRange() {
    const pageLimit = 21;
    const rangeStart = (currentPage - 1) * pageLimit;
    const rangeEnd = currentPage * pageLimit;

    return reversed.filter(
      (item, index) => index >= rangeStart && index < rangeEnd
    );
  }

  return (
    <section className="property container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="row">
          {pageRange().map((item) => (
            <ListItem
              key={item._id}
              id={item._id}
              uuid={item.uuid}
              firstCategory={item?.category[0]}
              secondCategory={item?.category[1]}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default List;
