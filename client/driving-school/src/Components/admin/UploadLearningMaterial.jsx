import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import LearningMaterials from "../student/LearningMaterials";

function UploadLearningMaterial() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    axios
      .post("http://localhost:5000/admin/learning-materials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Learning material uploaded successfully.");
        // Clear form after successful upload
        setFile(null);
        setDescription("");
      })
      .catch((err) => {
        console.error("Error uploading learning material:", err);
        alert("Failed to upload learning material. Please try again later.");
      });
  };

  return (
    <div>
      <div className="container">
        <Sidebar />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="mb-4">
              <center>Upload Learning Material</center>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
      <LearningMaterials />
    </div>
  );
}

export default UploadLearningMaterial;
