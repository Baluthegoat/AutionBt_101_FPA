"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

function CreateRoom() {
  const [name, setName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemStartingPrice, setItemStartingPrice] = useState(0);
  const [itemMinSellingPrice, setItemMinSellingPrice] = useState(0);
  const [itemMinIncrementBid, setItemMinIncrementBid] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = Cookies.get("jwt");
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/protected/auction/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            itemName,
            itemDescription,
            itemStartingPrice,
            itemMinSellingPrice,
            itemMinIncrementBid,
            startTime,
            endTime,
            productId,
          }),
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create auction");
        } else {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to create auction");
        }
      }

      const data = await response.json();
      setMessage("Auction created successfully");
      console.log(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Create Auction</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded shadow-md"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Item Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Starting Price"
          value={itemStartingPrice}
          onChange={(e) => setItemStartingPrice(Number(e.target.value))}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Minimum Selling Price"
          value={itemMinSellingPrice}
          onChange={(e) => setItemMinSellingPrice(Number(e.target.value))}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Minimum Increment Bid"
          value={itemMinIncrementBid}
          onChange={(e) => setItemMinIncrementBid(Number(e.target.value))}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <Button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Auction
        </Button>
      </form>
    </div>
  );
}
 
export default CreateRoom;
