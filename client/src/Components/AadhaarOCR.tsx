import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"; 
import axios from "axios";

interface AadhaarData {
  aadhaarNumber: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
}

const AadhaarOCR: React.FC = () => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [aadhaarData, setAadhaarData] = useState<AadhaarData | null>(null);

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFrontFile(e.target.files[0]);
    }
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBackFile(e.target.files[0]);
    }
  };

  const handleParseData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!frontFile || !backFile) {
      alert("Please upload both Aadhaar front and back images.");
      return;
    }

    const formData = new FormData();
    formData.append("aadharFront", frontFile);
    formData.append("aadharBack", backFile);

    try {
      const response = await axios.post("http://localhost:4000/parse-data",formData,
        {
            headers: {    
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log(response)

      if (response.data.data) {
        const data: AadhaarData = await response.data.data.data
        setAadhaarData(data);
      } else {
        console.error("Failed to parse Aadhaar details.");
      }
    } catch (error) {
      console.error("Error while sending data to backend:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-6">
    {/* Left Side: Upload Boxes */}
    <div className="flex flex-col space-y-8 w-1/2">
      {/* Front Upload */}
      <div
        className="border-2 border-dashed border-[#9380fe] flex items-center justify-center h-60 rounded-lg cursor-pointer hover:bg-[#f3f0ff]"
        onClick={() => document.getElementById("frontFile")?.click()}
      >
        <div className="text-center text-[#9380fe]">
          <FaCloudUploadAlt size={50} />
          <p className="font-semibold">Upload Aadhaar Front</p>
          <input
            type="file"
            id="frontFile"
            className="hidden"
            accept="image/*"
            onChange={handleFrontFileChange}
          />
          {frontFile && (
            <img
              src={URL.createObjectURL(frontFile)}
              alt="Aadhaar Front"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
      </div>
  
      {/* Back Upload */}
      <div
        className="border-2 border-dashed border-[#9380fe] flex items-center justify-center h-60 rounded-lg cursor-pointer hover:bg-[#f3f0ff]"
        onClick={() => document.getElementById("backFile")?.click()}
      >
        <div className="text-center text-[#9380fe]">
          <FaCloudUploadAlt size={50} />
          <p className="font-semibold">Upload Aadhaar Back</p>
          <input
            type="file"
            id="backFile"
            className="hidden"
            accept="image/*"
            onChange={handleBackFileChange}
          />
          {backFile && (
            <img
              src={URL.createObjectURL(backFile)}
              alt="Aadhaar Back"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
      </div>
  
      {/* Centered Parse Data Button */}
      <div className="flex justify-center mt-4">
        <form onSubmit={handleParseData}>
          <button
            type="submit"
            className="bg-[#9380fe] text-white py-2 px-4 rounded hover:bg-[#7a66e6] transition"
          >
            Parse Data
          </button>
        </form>
      </div>
    </div>
  
    {/* Right Side: Aadhaar Details */}
    <div className="flex-1 ml-8 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-[#9380fe]">Aadhaar Details</h2>
  
      {aadhaarData ? (
        <div className="mt-6">
          <p className="mb-2">
            <strong>Aadhaar Number:</strong> {aadhaarData.aadhaarNumber}
          </p>
          <p className="mb-2">
            <strong>Name:</strong> {aadhaarData.name}
          </p>
          <p className="mb-2">
            <strong>Date of Birth:</strong> {aadhaarData.dob}
          </p>
          <p className="mb-2">
            <strong>Gender:</strong> {aadhaarData.gender}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {aadhaarData.address}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-gray-500">No data parsed yet.</p>
      )}
    </div>
  </div>
  
  );
};

export default AadhaarOCR;
