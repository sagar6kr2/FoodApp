import React from "react";
import { useRef, useState } from "react";
import styles from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.length == 5;
const isNumber = (value) => value.length == 10;

const CheckOut = (props) => {
  const [fromInputIsValidty, setfromInputIsvalidty] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
    number: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const numberInputRef = useRef();

  const dataSubmitHandler = (event) => {
    event.preventDefault();
   const enteredName = nameInputRef.current.value;
   const enteredStreet = streetInputRef.current.value;
   const enteredPostalCode = postalCodeInputRef.current.value;
   const enteredcity = cityInputRef.current.value;
   const enteredNumber = numberInputRef.current.value;

    const enteredNameIsValide = !isEmpty(enteredName);
    const enteredStreetIsValide = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValide =
       isFiveChars(enteredPostalCode);
    const enteredCityIsValide = !isEmpty(enteredcity);
    const enteredNumberIsValide =
      isNumber(enteredNumber);

    setfromInputIsvalidty({
        name: enteredNameIsValide,
        street: enteredStreetIsValide,
        city:enteredCityIsValide,
        postalCode:enteredPostalCodeIsValide,
        number:enteredNumberIsValide
    })

    const formIsValid =
      enteredNameIsValide &&
      enteredStreetIsValide &&
      enteredPostalCodeIsValide &&
      enteredCityIsValide &&
      enteredNumberIsValide;
    
      if(!formIsValid){
        return;
      }
     props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city :enteredcity,
        postalCode:enteredPostalCode,
        number:enteredNumber
        
     })
  };
  const nameControlClass =`${styles.control} ${fromInputIsValidty.name ? '' : styles.invalid}`
  const streetControlClass =`${styles.control} ${fromInputIsValidty.street ? '' : styles.invalid}`
  const cityControlClass =`${styles.control} ${fromInputIsValidty.city ? '' : styles.invalid}`
  const numberControlClass =`${styles.control} ${fromInputIsValidty.number? '' : styles.invalid}`
  const postalControlClass =`${styles.control} ${fromInputIsValidty.postalCode? '' : styles.invalid}`
  return (
    <form className={styles.form} onSubmit={dataSubmitHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name"> your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!fromInputIsValidty.name &&<p>please Enter your name</p>}
      </div>

      <div className={streetControlClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!fromInputIsValidty.street &&<p>please Enter your Street</p>}
      </div>

      <div className={postalControlClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!fromInputIsValidty.postalCode &&<p>please enter your valid Pin Code</p>}
      </div>

      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!fromInputIsValidty.city &&<p>please Enter your city-name</p>}
      </div>

      <div className={numberControlClass}>
        <label htmlFor="number">Number</label>
        <input type="number" id="number" ref={numberInputRef} />
        {!fromInputIsValidty.number &&<p>please Enter valid number</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Submit</button>
      </div>
    </form>
  );
};

export default CheckOut;
