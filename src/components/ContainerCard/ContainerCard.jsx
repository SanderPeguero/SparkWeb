
import styles from "./ContainerCard.module.css"

import PropTypes from 'prop-types'

const ContainerCard = ({ children, className }) => (
    <div className={`${styles.container} ${className}`}>{ children }</div>
)

ContainerCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default ContainerCard