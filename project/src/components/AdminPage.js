import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "./css/AdminPage.css";

const AdminPage = () => {
  const [data, setData] = useState({});
  const [selectedName, setSelectedName] = useState(null);
  const [showFiles, setShowFiles] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-db");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.folder);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNameClick = (name) => {
    if (selectedName === name) {
      setShowFiles(!showFiles);
      setShowImages(!showImages);
    } else {
      setSelectedName(name);
      setShowFiles(true);
      setShowImages(false);
    }
  };

  const handleToggleFiles = () => {
    setShowFiles(true);
    setShowImages(false);
  };

  const handleToggleImages = () => {
    setShowFiles(false);
    setShowImages(true);
  };

  const handleDelete = async (type, index) => {
    const updatedData = { ...data };
    if (type === "files") {
      updatedData[selectedName].files.splice(index, 1);
    } else if (type === "images") {
      updatedData[selectedName].images.splice(index, 1);
    }
    setData(updatedData);

    try {
      const response = await fetch("http://localhost:3000/update-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder: updatedData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleAddName = async () => {
    if (newName.trim()) {
      try {
        const response = await fetch("http://localhost:3000/add-folder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        });
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = { ...data, [newName]: { files: [], images: [] } };
        setData(newData);
        setNewName("");
      } catch (error) {
        console.error("Failed to add new name:", error);
      }
    }
  };

  return (
    <div className="home">
      <AdminNavbar />
      <div className="admin-page">
        <div className="names-list">
          <div className="edit">
            <input
              type="text"
              placeholder="New folder name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleAddName}>Add +</button>
          </div>
          {Object.keys(data).map((name) => (
            <div
              key={name}
              className={`name-item ${selectedName === name ? "selected" : ""}`}
              onClick={() => handleNameClick(name)}
            >
              {name}
            </div>
          ))}
        </div>
        <div className="data-display">
          {selectedName && (
            <>
              <div className="toggle-buttons">
                <button
                  onClick={handleToggleFiles}
                  className={showFiles ? "active" : ""}
                >
                  Files
                </button>
                <button
                  onClick={handleToggleImages}
                  className={showImages ? "active" : ""}
                >
                  Images
                </button>
                <div className="files-edit">
                  <button>Add +</button>
                </div>

              </div>
              {showFiles && (
                <>
                  <h2>Files</h2>
                  <div className="files-list">
                    {data[selectedName]?.files?.length > 0 ? (
                      data[selectedName].files.map((file, index) => (
                        <div key={index} className="file-item">
                          {file}
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete("files", index)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="no-data">No data</div>
                    )}
                  </div>
                </>
              )}
              {showImages && (
                <>
                  <h2>Images</h2>
                  <div className="images-list">
                    {data[selectedName]?.images?.length > 0 ? (
                      data[selectedName].images.map((image, index) => (
                        <div key={index} className="image-item">
                          {image}
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete("images", index)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="no-data">No data</div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
