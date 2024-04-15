import styles from "./BrickLayout.module.css"
import img1 from '../../../public/dummy_image/1.jpg'
import img2 from '../../../public/dummy_image/2.jpg'
import img3 from '../../../public/dummy_image/3.jpg'
import img4 from '../../../public/dummy_image/4.jpg'
import img5 from '../../../public/dummy_image/5.jpg'
import img6 from '../../../public/dummy_image/6.jpg'
import img7 from '../../../public/dummy_image/7.jpg'
import img8 from '../../../public/dummy_image/8.jpg'
import img9 from '../../../public/dummy_image/9.jpg'
import imgN1 from '../../../public/dummy_image/dj.avif'
import imgN2 from '../../../public/dummy_image/djrecord.webp'
import imgN3 from '../../../public/dummy_image/luces.avif'
import { useState, useContext, useEffect } from 'react';
import { ContextVariable } from "../../Context"
const BrickLayout = () => {
  const { listImg, ListImages } = useContext(ContextVariable)

  const totalColumns = Math.ceil(ListImages.length / 3);

  const columns = Array.from({ length: totalColumns }, (_, index) =>
    ListImages.slice(index * 3, (index + 1) * 3)
  );

  // console.log(
  //   columns.map((column, columnIndex) => {
  //     console.log(`Columna ${columnIndex + 1}:`);
  //     return column.map((image, imageIndex) => {
  //       console.log(`  Imagen ${imageIndex + 1}:`, image);
  //       return image; // Devuelve la imagen para mantener la estructura de datos
  //     });
  //   })
  // );
  



  const brickColumns = columns.map((column, columnIndex) => (
    <div key={columnIndex} className={styles["brick-column"]}>
      {column.map((image, imageIndex) => {
        return (
          <img
            key={imageIndex}
            src={image.Url} // Accede a la propiedad Url de cada objeto de imagen
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


// <div className={styles["brick-layout"]}>
//   <div className={styles["brick-column"]}>
//     <img src={img1} alt="" />
//     <img src={imgN2} alt="" />
//     <img className="h-6 w-6" src={imgN1} alt="" />
//   </div>
//   <div className={styles["brick-column"]}>
//     <img src={img4} alt="" />
//     <img src={imgN3} alt="" />
//     <img src={img6} alt="" />
//   </div>
//   <div className={styles["brick-column"]}>
//     <img src={img7} alt="" />
//     <img src={img8} alt="" />
//     <img src={img9} alt="" />
//   </div>
// </div>