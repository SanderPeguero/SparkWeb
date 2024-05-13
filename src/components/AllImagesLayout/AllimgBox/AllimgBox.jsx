// import styles of this component

import styles from "./MasonryBox.module.css"

import { PropTypes } from 'prop-types';

// MasonryBox component
const AllimgBox = ({ wallSrc, userProf }) => {
  return (
    <div className={styles["my-masonry"]}>
      <img src={wallSrc} style={{ width: "100%" }} alt="" />
      <div className={`${styles["my-masnry-user-box"]} flex align-items-center`}>
      </div>
    </div>

  )
}

export default AllimgBox
