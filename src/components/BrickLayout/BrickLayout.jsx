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
const BrickLayout = () => {
  return (
    <div className={styles["brick-layout"]}>
      <div className={styles["brick-column"]}>
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
      </div>
      <div className={styles["brick-column"]}>
        <img src={img4} alt="" />
        <img src={img5} alt="" />
        <img src={img6} alt="" />
      </div>
      <div className={styles["brick-column"]}>
        <img src={img7} alt="" />
        <img src={img8} alt="" />
        <img src={img9} alt="" />
      </div>
    </div>
  )
}

export default BrickLayout