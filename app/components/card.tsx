import React from "react";
import styles from "./card.module.css";

const Card = ({ item }: any) => {
  console.log(item);
  return item.events?.map((event: any, index: any) => (
    <div
      className={`card ${styles.card}`}
      style={{
        width: "18rem",
        display: "flex",
        flexDirection: "column",
      }}
      key={index}
    >
      {event.imageUrl && (
        <img className="card-img-top" src={event.imageUrl} alt={event.name} />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event?.name}</h5>
        <p className="card-text">{event?.description}</p>
        <p className="card-text">{event?.time}</p>
        <p className="card-text">{event?.location}</p>
        <a href="#" className="btn btn-primary mt-auto">
          Go somewhere
        </a>
      </div>
    </div>
  ));
};

export default Card;
