import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 6;

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const res = await api.get("/applications", {
      params: { search, status },
    });
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, status]);

  const deleteItem = async (id: string) => {
    await api.delete(`/applications/${id}`);
    fetchData();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      case "INTERVIEWING":
        return "bg-yellow-100 text-yellow-700";
      case "OFFER":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const startIndex = (page - 1) * limit;
  const paginatedData = data.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(data.length / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
            Job Applications Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Track your applications easily
          </p>
        </div>

        {/* FILTERS */}
        <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-3 mb-6">

          <input
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search company or job..."
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="w-full md:w-60 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading applications...
          </div>
        )}

        {/* EMPTY */}
        {!loading && data.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No applications found
          </div>
        )}

        {/* TABLE (DESKTOP) */}
        <div className="hidden md:block bg-white border rounded-xl overflow-hidden shadow-sm">

          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium text-gray-800">
                    {item.company_name}
                  </td>

                  <td className="p-3 text-gray-600">
                    {item.job_title}
                  </td>

                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => navigate(`/edit/${item.id}`)}
                        className="px-3 py-1 text-xs rounded bg-yellow-400 hover:bg-yellow-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteItem(item.id)}
                        className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-3">

          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >

              <div className="flex justify-between items-start">

                <div>
                  <h2 className="font-semibold text-gray-800">
                    {item.company_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.job_title}
                  </p>
                </div>

                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>

              </div>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => navigate(`/edit/${item.id}`)}
                  className="flex-1 py-2 text-sm bg-yellow-400 rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="flex-1 py-2 text-sm bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* PAGINATION */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 text-sm rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}