"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
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
      const response = await fetch("http://localhost:3000/protected/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          image,
        }),
      });

      if (!response.ok) {
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create product");
        } else {
          // Handle non-JSON error response
          const errorText = await response.text();
          throw new Error(errorText || "Failed to create product");
        }
      }

      const data = await response.json();
      setMessage("Product created successfully!");
      console.log(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
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
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Button type="submit">Create Product</Button>
      </form>
    </div>
  );
}

export default CreateProduct;
