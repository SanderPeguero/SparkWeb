import { useContext, useState } from "react"

// import styles of this component
import styles from "./Dropdown.module.css"

// import other react pkg to use
import { ArrowUp3 } from "iconsax-react"
import { PropTypes } from 'prop-types';

// import other component to use
import Button from "../Button/Button"
import { ContextVariable } from "../../Context";
import { MdCategory } from "react-icons/md";
import { AddCategory } from "../../Scripts/UploadAllImg";
// import { TbCategoryPlus } from "react-icons/tb";
// import { TbCategory } from "react-icons/tb";
import categoryPlus from '../../assets/categoryPlus.svg'
// Dropdown Component
const Dropdown = ({  title, liftingDdTextUp }) => {
  const { user, setCategories, categories } = useContext(ContextVariable)
  const [ddTitle, setDdTitle] = useState(title)
  const ddItem = (ddId, ev) => {
    const ddTitle = ev.target.innerHTML
    activeDropDownItem(ddId)
    setDdTitle(ddTitle)
    liftingDdTextUp && liftingDdTextUp(ddTitle)
  }

  const activeDropDownItem = (dropdownItemId) => {
    setCategories(prev => {
      prev.forEach(item => item.Active = false)
      const myDd = prev.find(ddId => ddId.Id === dropdownItemId)
      myDd.Active = true
      return [...prev]
    })
  }

  const handleAddCategory = () => {
    const addCategory = window.prompt("Enter Category Name")
    if (addCategory) {  
     AddCategory(1, addCategory, setCategories)
    }
  }

  return (
    <div className="flex flex-row items-center"> 
    {user && user.role === 'admin' && (
      <div className="px-3 py-2 text-right  text-xs leading-4">
        <button onClick={() => handleAddCategory()} className="px-3 py-1 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-[#ba36ba] hover:text-white focus:outline-none">
          {/* <TbCategory size={25} className="text-white" /> */}
          <img src={categoryPlus} className="h-6 w-6" />
        </button>
      </div>
    )}
      <div className={styles["dropdown"]}>

        <Button theme="transparent" className="flex align-items-center">
          {ddTitle}
          <span className={styles["dropdown-arrow-icon"]}>
            <ArrowUp3 color="var(--white-100)" />
          </span>
        </Button>
        <ul className={styles["dropdown-menu"]}>
          {categories.map((item, index) => (
             <li
              key={index}
              className={`${styles["dropdown-item-menu"]} ${item.Active && styles.active}`}
              onClick={(ev) => ddItem(item.Id, ev)}>
              {item.Name}
            </li>
          ))}

        </ul>
      </div></div>
  )
}


export default Dropdown