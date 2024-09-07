import React from "react";
import styles from "./card.module.css";

const Card = ({ item }: any) => {
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
      <img className="card-img-top" src={event.image.url} alt={event.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event.name}</h5>
        <p className="card-text">{event.summary}</p>
        <a href="#" className="btn btn-primary mt-auto">
          Go somewhere
        </a>
      </div>
    </div>
  ));
};

export default Card;
