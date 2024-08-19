"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
        throw new Error("Failed to create auction");
      }

      const data = await response.json();
      setMessage("Auction created successfully!");
      console.log(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div  className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <h1 className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">Create Auction</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
       
          <Card >
          
        
          <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required

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
        </Card>
        
        
        
        <Button type="submit">Create Auction</Button>
      </form>
    </div>
  );
}

export default CreateRoom;
