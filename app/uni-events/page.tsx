"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "../components/card";

const EventPage = () => {
  const [result, setResult]: any = useState([]);
  const [error, setError]: any = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/uniEvents.json");
        const data = await response.json();
        console.log("data==", data);
        setResult(data);
      } catch (err) {
        setError(err);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div>
      {result.map((item: any, resultIndex: any) => (
        <div className={styles.category} key={resultIndex}>
          <h3>{item.name}</h3>
          <hr></hr>
          <div className={styles.cardContainer}>
            <Card item={item} />
          </div>
        </div>
      ))}
    </div>
    // <div className={styles.cardContainer}>
    //   {result?.map((event: any, index: any) => (
    //     <Card event={event} key={index} />
    //   ))}
    // </div>
  );
};

export default EventPage;
