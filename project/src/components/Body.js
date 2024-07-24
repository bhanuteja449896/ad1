import React, { useState, useEffect } from "react";
import "./css/Body.css";

const Body = () => {
  const [data, setData] = useState({});
  const [selectedName, setSelectedName] = useState(null);
  const [showFiles, setShowFiles] = useState(true);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }, []);

  const handleNameClick = (name) => {
    setSelectedName(name);
    setShowFiles(true); // Default to showing files when a name is clicked
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
