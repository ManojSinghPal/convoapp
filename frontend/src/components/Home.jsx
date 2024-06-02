import { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [selectedfile, setSelectedfile] = useState(null);
  const [convert, setConvert] = useState(null);
  const [downloadError, setDownloadError] = useState("");
  //   console.log(selectedfile);

  const handelFileChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedfile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    // event.preventdefault();

    if (!selectedfile) {
      setConvert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedfile);
    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);

      const link = document.createElement("a");
      console.log(link);

      link.href = url;
      console.log(link);

      link.setAttribute(
        "download",
        selectedfile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      console.log(link);

      document.body.appendChild(link);
      console.log(link);

      link.click();
      link.parentNode.removeChild(link);
      setSelectedfile(null);
      setDownloadError();
      setConvert("File Converted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container py-3 px-6 md:px-40">
        <div className="flex h-screen items-center justify-center">
          <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-500">
            <h1 className="text-3xl font-bold text-center mb-4">
              Convert Word to PDF Online
            </h1>
            <p className="sm text-center mb-5">
              Easily convert word document to PDF format online, without having
              to install any software.
            </p>

            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                accept=".doc,.docx"
                onChange={handelFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="w-full flex items-center  hover:text-white justify-center px-4 py-6 bg-gray-300 text-gray-700 shadow-lg rounded-lg cursor-pointer border-blue-700 hover:bg-blue-600 duration-300"
              >
                <FaFileWord className="text-3xl mr-2" />
                <span className="text-2xl mr-2">
                  {selectedfile ? selectedfile.name : "Choose File"}
                </span>
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selectedfile}
                className="disabled:bg-gray-500 disabled:pointer-events-none text-white font-bold bg-blue-400 hover:bg-blue-600 duration-300 rounded-lg px-4 py-2"
              >
                Convert File
              </button>
              {convert && (
                <div className="text-green-500 text-center">{convert}</div>
              )}

              {downloadError && (
                <div className="text-red-500 text-center">{downloadError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
