import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "./css/AdminPage.css";

const AdminPage = () => {
  const [data, setData] = useState({});
  const [selectedName, setSelectedName] = useState(null);
  const [showFiles, setShowFiles] = useState(false);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }, []);

  const handleNameClick = (name) => {
    if (selectedName === name) {
      // Toggle visibility if the same name is clicked again
      setShowFiles(!showFiles);
      setShowImages(!showImages);
    } else {
      // Select the name and show the buttons
      setSelectedName(name);
      setShowFiles(true); // Default to showing files
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

  const handleDelete = (type, index) => {
    const updatedData = { ...data };
    if (type === "files") {
      updatedData[selectedName].files.splice(index, 1);
    } else if (type === "images") {
      updatedData[selectedName].images.splice(index, 1);
    }
    setData(updatedData);

    // Send a request to update the JSON file
    fetch("/update-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }).then((response) => {
      if (!response.ok) {
        console.error("Failed to update data");
      }
    });
  };

  return (
    <div className="home">
      <AdminNavbar />
      <div className="admin-page">
        <div className="names-list">
        <div className="edit">
          Edit 
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
              </div>
              {showFiles && (
                <>
                  <h2>Files</h2>
                  <div className="files-list">
                    {data[selectedName].files.length > 0 ? (
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
                    {data[selectedName].images.length > 0 ? (
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
