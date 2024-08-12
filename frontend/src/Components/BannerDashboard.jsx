import React, { useContext, useState, useEffect } from "react";
import { BannerContext } from "./BannerProvider";
import axios from "axios";
const backend = "https://bannerspagaurav.onrender.com";

export default function BannerDashboard() {
  const { banner, setBanner } = useContext(BannerContext);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    timer: 0,
    link: "",
    offer: "",
  });

  useEffect(() => {
    // Initialize form data
    if (banner) {
      setFormData({
        id: banner.id || "",
        title: banner.title || "",
        description: banner.description || "",
        timer: banner.timer || 0,
        link: banner.link || "",
        offer: banner.offer || "",
      });
    }
  }, [banner]);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${backend}/api/banner`);
      const bannerData = response.data;
      setBanner(bannerData);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "timer" || name === "id" ? Number(value) : value,
    }));
  };

  const handleToggleVisibility = async () => {
    try {
      const newVisibility = !banner.visibility;
      const response = await axios.post(`${backend}/api/banner/toggle`, {
        id: banner.id,
        visibility: newVisibility,
      });
      if (response.data.success) {
        setBanner((prev) => ({ ...prev, visibility: newVisibility }));
        window.location.reload();

        console.log("Visibility toggled successfully", newVisibility);
      } else {
        console.error("Failed to toggle visibility");
      }
    } catch (error) {
      console.error("Error toggling banner visibility:", error);
    }
    fetchBanner();
  };

  const handleUpdateBanner = async () => {
    try {
      const response = await axios.post(`${backend}/api/banner/update`, {
        ...formData,
        startTime: Math.floor(Date.now() / 1000),
      });
      if (response.data.success) {
        setBanner((prev) => ({ ...prev, ...formData }));
        alert("Banner updated successfully!");
        window.location.reload();
      } else {
        console.error("Failed to update banner");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  return (
    <div className="max-w-4xl container mx-auto p-8 mt-16 bg-gray-100 bg-opacity-5 shadow-2xl rounded-lg border-2 border-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        Banner Dashboard
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-100">
          Banner Id
        </label>
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="mt-1 p-2 bg-gray-300 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-100">
          Update Banner Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 p-2 bg-gray-300 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-100">
          Update Banner Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 bg-gray-300 border rounded w-full"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-100">
          Update Banner Timer (in seconds)
        </label>
        <input
          type="number"
          name="timer"
          value={formData.timer}
          onChange={handleChange}
          className="mt-1 p-2 bg-gray-300 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-100">
          Update Banner Link
        </label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          className="mt-1 p-2 bg-gray-300 border rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-100">
          Update Banner Offer
        </label>
        <input
          type="text"
          name="offer"
          value={formData.offer}
          onChange={handleChange}
          className="mt-1 p-2 bg-gray-300 border rounded w-full"
        />
      </div>

      <div className="mb-4 flex space-x-5 items-center">
        <label className="flex text-md font-medium text-gray-100">
          Current Status:{" "}
          {banner.visibility ? (
            <p className="text-green-500 ml-1">"Visible"</p>
          ) : (
            <p className="text-red-500 ml-1">"Not Visible"</p>
          )}
        </label>
        <button
          onClick={handleToggleVisibility}
          className={`mt-1 px-4 py-2 rounded-full ${
            banner.visibility ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {banner.visibility ? "Hide Banner" : "Show Banner"}
        </button>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleUpdateBanner}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
          style={{ background: "#E11D48" }}
        >
          Update Banner
        </button>
      </div>
    </div>
  );
}
