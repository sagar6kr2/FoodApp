import React from "react";
import { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
// import Meals from "./Meals";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meal, setMeal] =useState([])

  useEffect(()=> {
    const fetchMeals = async () => { 
    const response = await fetch('https://react--api-9eec6-default-rtdb.firebaseio.com/meals.json')
    const responseData =await response.json();
    const loadedMeals = [];

    for(const key in responseData){
      loadedMeals.push({
        id : key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
      })
    }
    setMeal(loadedMeals)
  };
    fetchMeals();
   }, []);
  const MealsList = meal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{MealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
