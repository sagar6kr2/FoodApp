import React from "react";
import { Fragment } from "react";

import styles from './Header.module.css'
import meals from '../../assets/meals.jpg'
import HeaderCardButton from "./HeaderCardButton";

const Header = (props) => {
  return (

      <Fragment>
        <header className={styles.header}>
           <h1>Food<span className={styles.span}>Adda</span></h1>
          <HeaderCardButton onClick={props.onShowCard}/>
          
        </header>
        <div className={styles['main-image']} >
          <img src={meals} alt=" A table full of delicious food "/>

        </div>
      </Fragment>
    
  )
}

export default Header
