import React, { useEffect, useState } from "react";
import Paginate from "./Paginate";
import "./Show.css";
const Show = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const search = (data: any) => {
    return data.filter(
      (obj: any) =>
        obj.id.toString().includes(query) ||
        obj.title.toString().includes(query)
    );
  };
  console.log(search(data));
  return (
    <div className="show">
      <Paginate data={search(data)} />
      <div className="search_filter">
        <input
          type="text"
          placeholder="Type anything for search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Show;
