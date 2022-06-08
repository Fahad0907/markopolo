import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Show.css";
const Paginate = (props: any) => {
  const { data } = props;
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [showAddButton, setShowAddbutton] = useState<Boolean>(false);

  let [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage: number = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
    console.log("i am reder");
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const onDelete = async (id: string) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        setCurrentItems(
          currentItems.filter((obj: any) => {
            return obj.id !== id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPost(id, title);
  };
  const handleUpdate = () => {
    console.log("Update", id, title);

    onDelete(id);
    addPost(id, title);
    setId("");
    setTitle("");
    setShowAddbutton(false);
  };
  const addPost = async (id: string, title: string) => {
    console.log("ADD", id, title);
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        title: title,
        body: "aaa",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        currentItems = [data, ...currentItems];
        setCurrentItems(currentItems);
      });
  };
  return (
    <div className="page">
      <form onSubmit={handlePost}>
        <div className="add_post">
          <div className="add_input">
            <input
              onChange={(e) => setId(e.target.value)}
              value={id}
              type="text"
              placeholder="Enter ID"
              id="id"
            />
          </div>
          <div className="add_input t">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter Title"
              id="title"
            />
          </div>
          {!showAddButton && (
            <button type="submit" className="add_post_button">
              Add Post
            </button>
          )}
        </div>
      </form>
      {showAddButton && (
        <button onClick={handleUpdate} className="update_button">
          Update
        </button>
      )}

      <table className="table">
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Action</th>
        </tr>

        {currentItems &&
          currentItems.map((obj: any) => {
            return (
              <tr>
                <td>{obj.id}</td>
                <td>{obj.title}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(obj.id);
                      setTitle(obj.title);
                      setShowAddbutton(true);
                      console.log(id, title);
                    }}
                    className="btn edit"
                  >
                    Edit
                  </button>
                  <button onClick={() => onDelete(obj.id)} className="btn del">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="data"></div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="pagination"
        pageLinkClassName="page_num"
        previousLinkClassName="page_num"
        nextLinkClassName="page_num"
        activeLinkClassName="active"
      />
    </div>
  );
};
export default Paginate;
