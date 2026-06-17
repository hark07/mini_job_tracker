import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Add() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    job_title: "",
    job_type: "INTERNSHIP",
    status: "APPLIED",
    applied_date: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await api.post("/applications", form);
      nav("/");
    } catch (err) {
      alert("Failed to add application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Job Application
        </h1>

        {/* Company Name */}
        <input
          name="company_name"
          placeholder="Company Name"
          value={form.company_name}
          onChange={handleChange}
          className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Job Title */}
        <input
          name="job_title"
          placeholder="Job Title"
          value={form.job_title}
          onChange={handleChange}
          className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Job Type */}
        <select
          name="job_type"
          value={form.job_type}
          onChange={handleChange}
          className="w-full border p-3 rounded-md mb-4"
        >
          <option value="INTERNSHIP">Internship</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-3 rounded-md mb-4"
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {/* Applied Date */}
        <input
          type="date"
          name="applied_date"
          value={form.applied_date}
          onChange={handleChange}
          className="w-full border p-3 rounded-md mb-4"
        />

        {/* Notes */}
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="w-full border p-3 rounded-md mb-4 h-24"
        />

        {/* Button */}
        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Save Application
        </button>
      </div>
    </div>
  );
}