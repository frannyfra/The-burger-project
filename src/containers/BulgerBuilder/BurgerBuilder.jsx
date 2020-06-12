import React, { Component } from "react";
import { aux as Aux } from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OderSummary";
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
    totalPrice: 2,
    purchasable: false,
    purchasing: false
  };

  purchaseHandler = event => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
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
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    //crei una variabile alla quale attribuisci il valore dello this.state.ingredients[type] - quindi prendi lo stato e in particolare prendi il valore del type nello stato
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
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
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState(ingredients) {
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    //Object.keys(ingredients) -> transform the object in array of properties -
    //     Object.keys() method is used to return an array whose elements are strings corresponding to the enumerable properties found directly upon an object. The ordering of the properties is the same as that given by the object manually in a loop is applied to the properties.
    // Object.keys() takes the object as an argument of which the enumerable own properties are to be returned and returns an array of strings that represent all the enumerable properties of the given object.
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  //lifecycle method - mounting
  render() {
    console.log(this.state.totalPrice);
    const disabledInfo = {
      ...this.state.ingredients
    };
    //per ogni key dell' oggetto che nel nostro caso e lo stato
    for (let key in disabledInfo) {
      //voglio verificare se
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
