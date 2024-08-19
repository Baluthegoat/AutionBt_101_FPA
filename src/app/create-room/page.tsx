"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState} from "react";

function CreateRoom() {
  const [name, setName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemStartingPrice, setItemStartingPrice] = useState(Number);
  const [itemMinSellingPrice, setItemMinSellingPrice] = useState(Number);
  const [itemMinIncrementBid, setItemMinIncrementBid] = useState(Number);
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

    try {
      const response = await fetch(
        "http://localhost:3000/protected/auction/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create auction");
        } else {
          // Handle non-JSON error response
          const errorText = await response.text();
          throw new Error(errorText || "Failed to create auction");
        }
      }

      const data = await response.json();
      setMessage("Auction created successfully!");
      console.log(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <h1>Create Auction</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          placeholder="Item Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Starting Price"
          value={itemStartingPrice}
          onChange={(e) => setItemStartingPrice(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Minimum Selling Price"
          value={itemMinSellingPrice}
          onChange={(e) => setItemMinSellingPrice(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Minimum Increment Bid"
          value={itemMinIncrementBid}
          onChange={(e) => setItemMinIncrementBid(Number(e.target.value))}
          required
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <Button type="submit">Create Auction</Button>
      </form>
    </div>
  );
}


export default CreateRoom;