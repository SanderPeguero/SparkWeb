import styles from "./BrickLayout.module.css"
import { useState, useContext, useEffect } from 'react';
import { ContextVariable } from "../../Context"
const BrickLayout = () => {
  const { listImg, ListImages } = useContext(ContextVariable)

  const totalColumns = Math.ceil(ListImages.length / 3);

  const columns = Array.from({ length: totalColumns }, (_, index) =>
    ListImages.slice(index * 3, (index + 1) * 3)
  )

  const brickColumns = columns.map((column, columnIndex) => (
    <div key={columnIndex} className={styles["brick-column"]}>
      {column.map((image, imageIndex) => {
        return (
          <img
            key={imageIndex}
            src={image.Url} 
            alt=""
            className={imageIndex === 2 ? "h-6 w-6" : ""}
          />
        );
      })}
    </div>
  ));
  
  return (
    <div className={styles["brick-layout"]}>
      {brickColumns}
    </div>
  );

}

export default BrickLayout
