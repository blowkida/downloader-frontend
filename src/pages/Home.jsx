// frontend/src/pages/Home.jsx
import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const response = await axios.post("https://downloader-backend-2.onrender.com/api/fetch-info", {
        url,
      });

      if (response.data && response.data.title) {
        setVideoData(response.data);
      } else {
        setError("No video info received.");
      }
    } catch (err) {
      setError("Failed to fetch video data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Smart Downloader</h1>
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste video URL here..."
          className="flex-1 p-3 rounded-l-lg border border-orange-300"
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-r-lg"
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {videoData && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-xl shadow">
          <div className="flex gap-4">
            <img
              src={videoData.thumbnail}
              alt="thumbnail"
              className="w-48 rounded-xl"
            />
            <div>
              <h2 className="text-xl font-bold text-orange-700">{videoData.title}</h2>
              <p className="text-gray-500 mt-1">Duration: {videoData.duration}</p>
              <p className="text-sm text-gray-400 mt-1">{videoData.extractor}</p>
            </div>
          </div>

          <table className="w-full mt-6 table-auto border-collapse">
            <thead>
              <tr className="bg-orange-100">
                <th className="text-left p-2">Quality</th>
                <th className="text-left p-2">Size</th>
                <th className="text-left p-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {videoData.formats.map((format, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{format.quality || "-"}</td>
                  <td className="p-2">{format.size || "-"}</td>
                  <td className="p-2">
                    <a
                      href={format.url}
                      className="text-orange-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
