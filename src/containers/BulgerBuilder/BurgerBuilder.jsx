import React, { Component } from "react";
import { aux as Aux } from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

//const that you want to use globally all capital:
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 2
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  removeIngredientHandler = type => {
    //crei una variabile alla quale attribuisci il valore dello this.state.ingredients[type] - quindi prendi lo stato e in particolare prendi il valore del type nello stato
    const oldCount = this.state.ingredients[type];
    //crei una variabile per mantenere il conto -updatedCount e uguale all old count variabile meno uno;
    const updatedCount = oldCount - 1;
    //fai una copia dello stato perche lo stato in react nn deve essere mai modificato originariamente , quindi quello che puoi fare e usare es6 soread operator per crea una copia shallow del tuo oggetto;
    //perche in js oggetti ed array point to a reference ?

    const updatedIngredients = {
      ...this.state.ingredients
    };
    //quindi setto il nuovo oggetto che ho create che rappresenta lo stato, in particolare il type (definito da qualche altra parte) uguale alla variabile che ho dichiarato
    updatedIngredients[type] = updatedCount;
    //adesso altro step e quello di update il prezzo anche
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  //lifecycle method - mounting
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
