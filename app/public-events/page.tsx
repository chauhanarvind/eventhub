"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Card from "../components/card";

const EventPage = () => {
  const [bucket, setBucket] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchEvents() {
      try {
        // Call the local Python API running on port 5000
        const response = await fetch("http://127.0.0.1:5000/public-events");
        const data = await response.json();
        setBucket(data);
        console.log(data);
      } catch (err) {
        setError("Failed to fetch events.");
      }
    }

    fetchEvents();
  }, []);

  return (
    <div>
      {bucket.map((item: any, bucketIndex: any) => (
        <div className={styles.category} key={bucketIndex}>
          <h3>{item.name}</h3>
          <hr></hr>
          <div className={styles.cardContainer}>
            <Card item={item} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventPage;
