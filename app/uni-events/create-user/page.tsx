import UserInterface from "@/app/lib/UserInterface";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState<UserInterface>({
    name: "",
    email: "",
    password: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("result=", result);

      if (response.ok) {
        setMessage("Event added successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occured while ssaving the user");
    }
  };
  return <div></div>;
};

export default Page;
