import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const JobsHome = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get("http://localhost:5000/jobs", config);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [token]);

  return (
    <div className="flex flex-col p-6">
      <button
        className="w-max bg-blue-600 rounded-md text-white px-12 py-1 mb-6"
        onClick={() => {
          navigate("/dashboard/post-jobs");
        }}
      >
        Post Interview
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job,index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-gray-500 mt-2">
                Location: {job.location || "Remote"}
              </p>
              <p className="text-gray-500">Salary: {job.salary}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-md"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default JobsHome;
