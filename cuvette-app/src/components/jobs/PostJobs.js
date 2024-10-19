import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostJobs = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    candidateEmails: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      candidateEmails: formData.candidateEmails
        .split(",")
        .map((mail) => mail.trim()), // Split by commas and remove extra spaces
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/jobs/post-jobs",
        dataToSubmit,
        config
      );
      console.log("Job posted successfully:", response.data);
      toast.success("Job posted successfully!"); // Success toast
    } catch (error) {
      console.error("Error posting the job:", error);
      toast.error("Failed to post job."); // Error toast
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Post a New Job</h2>

      <form onSubmit={handleSubmit} className="flex flex-col mx-auto space-y-4">
        {/* Title */}
        <div className="flex">
          <label
            htmlFor="title"
            className="block w-4/12 text-right p-4 px-12 font-medium"
          >
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter job title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 w-4/12 rounded"
          />
        </div>

        {/* Description */}
        <div className="flex">
          <label
            htmlFor="description"
            className="block w-4/12 text-right p-4 px-12 font-medium"
          >
            Job Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter job description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border h-36 p-2 w-4/12 rounded"
          ></textarea>
        </div>

        {/* Experience */}
        <div className="flex">
          <label
            htmlFor="experience"
            className="block w-4/12 text-right p-4 px-12 font-medium"
          >
            Required Experience
          </label>
          <input
            type="text"
            name="experienceLevel"
            placeholder="select experienceLevel"
            id="experience"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
            className="border p-2 w-4/12 rounded"
          />
        </div>

        {/* Candidate Emails */}
        <div className="flex">
          <label
            htmlFor="candidateMails"
            className="block w-4/12 text-right p-4 px-12 font-medium"
          >
            Add Candidate
          </label>
          <input
            type="text"
            name="candidateEmails"
            id="candidateEmails"
            placeholder="Enter candidate mails"
            value={formData.candidateEmails}
            onChange={handleChange}
            required
            className="border p-2 w-4/12 rounded"
          />
        </div>

        {/* End Date */}
        <div className="flex">
          <label
            htmlFor="endDate"
            className="block w-4/12 text-right p-4 px-12 font-medium"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            placeholder="select a date"
            onChange={handleChange}
            required
            className="border p-2 w-4/12 rounded"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 mx-auto text-white px-4 py-2 rounded-md"
        >
          Post Job
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default PostJobs;
