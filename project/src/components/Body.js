import React, { useState, useEffect } from "react";
import "./Body.css";

const Body = () => {
  const [data, setData] = useState({});
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }, []);

  const handleNameClick = (name) => {
    setSelectedName(name);
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
            <h2>Files</h2>
            <div className="files-list">
              {data[selectedName].files.map((file, index) => (
                <div key={index} className="file-item">
                  {file}
                </div>
              ))}
            </div>
            <h2>Images</h2>
            <div className="images-list">
              {data[selectedName].images.map((image, index) => (
                <div key={index} className="image-item">
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
