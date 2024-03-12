import styles from "./Button.module.css"
// import PropTypes from 'prop-types'
import PropTypes from 'prop-types'

const Button = ({ children, theme, onClick, className }) => (
    <button
        className={`${styles.button} ${styles[theme]} ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
)

Button.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default Button