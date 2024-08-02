import React, { useState, useEffect } from "react";
import "./css/Body.css";

const Body = () => {
  const [data, setData] = useState({});
  const [selectedName, setSelectedName] = useState(null);
  const [showFiles, setShowFiles] = useState(true);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-db");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.folder); // Access the 'folder' property directly
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

  return (
    <div className="body-container">
      <div className="names-list">
        {Object.keys(data).map((name) => (
          <div key={name} className="name-item" onClick={() => handleNameClick(name)}>
            {name}
          </div>
        ))}
      </div>
      <div className="data-display">
        {selectedName && (
          <>
            <div className="buttons-container">
              <button className={showFiles ? "active" : ""} onClick={() => setShowFiles(true)}>Files</button>
              <button className={!showFiles ? "active" : ""} onClick={() => setShowFiles(false)}>Images</button>
            </div>
            <div className="items-list">
              {showFiles
                ? data[selectedName].files.map((file, index) => (
                    <div key={index} className="item-box">
                      {file}
                    </div>
                  ))
                : data[selectedName].images.map((image, index) => (
                    <div key={index} className="item-box">
                      {image}
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Body;

