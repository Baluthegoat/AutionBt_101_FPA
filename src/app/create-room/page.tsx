"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"




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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <Card>
          <CardHeader>
            <CardTitle>Create New Auction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4, ">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <Textarea
              placeholder="Item Description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Starting Price"
              value={itemStartingPrice}
              onChange={(e) => setItemStartingPrice (Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="Minimum Selling Price"
              value={itemMinSellingPrice}
              onChange={(e) => setItemMinSellingPrice(Number(e.target.value))}
              required
            />
            <Input
              type="number"
              placeholder="Minimum Increment Bid"
              value={itemMinIncrementBid}
              onChange={(e) => setItemMinIncrementBid(Number(e.target.value))}
              required
            />
            <Input
              type="datetime-local"
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <Input
              type="datetime-local"
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </CardContent>
          <CardFooter>
            <Button  className="bg-purple-600 text-white hover:bg-purple-700" type="submit">
              Create Auction
              </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}


export default CreateRoom;
