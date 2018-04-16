import React ,{Component} from 'react';
import Aux from '../../hoc/AuxNew'
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGEDIENT_PRICE = {
    salad : 0.5,
    cheese : 0.4,
    bacon : 1.3,
    meat : 2.0
}
class BurgerBuilder extends Component{

    state = {
        ingredient:{
            cheese : 0,
            salad : 0,
            bacon : 0,
            meat : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing: false
    }

    addIngredientHandle = (type) => {
        const oldCount = this.state.ingredient[type]
        console.log("oldCount"+oldCount)
        const updatedCount = oldCount + 1
        console.log("updatedCount"+updatedCount)

        const updatedIngrdient = {
            ...this.state.ingredient
        }
        updatedIngrdient[type] = updatedCount;
        console.log("updatedIngrdient"+updatedIngrdient[type])
        const priceAddition = INGEDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPriceAddition = oldPrice + priceAddition;
        this.setState({
            totalPrice : newPriceAddition,
            ingredient : updatedIngrdient
        })
        this.updatePurchasable(updatedIngrdient)


    }


    cancelHandler = () => {
        this.setState({purchasing:false})
    }

    successHandler = () => {
        alert('success')
    }

    purchasingCancel = () => {
        this.setState({purchasing :false})
    }
    updatePurchasingHandler = () => {
        this.setState({purchasing :true})
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type]
        if(oldCount <= 0){
            return;
        }
        console.log("oldCount"+oldCount)
        const updatedCount = oldCount - 1
        console.log("updatedCount"+updatedCount)

        const updatedIngrdient = {
            ...this.state.ingredient
        }
        updatedIngrdient[type] = updatedCount;
        console.log("updatedIngrdient"+updatedIngrdient[type])
        const priceDeduction = INGEDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPriceDeduction = oldPrice - priceDeduction;
        this.setState({
            totalPrice : newPriceDeduction,
            ingredient : updatedIngrdient
        })
        this.updatePurchasable(updatedIngrdient)
    }

    updatePurchasable(ingredient) {
        const sum = Object.keys(ingredient)
                        .map(igKey => {
                            return ingredient[igKey];
                        })
                        .reduce((sum,el) => {
                            return sum + el;
                        },0)
       this.setState({purchasable : sum > 0})                 

    }

   
    render(){

        const disableInfo = {
            ...this.state.ingredient
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                modelClosed = {this.purchasingCancel}>
                <OrderSummary ingredientnew = {this.state.ingredient}
                              danger = {this.cancelHandler}
                              success = {this.successHandler}
                              price = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredient = {this.state.ingredient}/>
                <BuildControls addIngredient = {this.addIngredientHandle}
                                removeIngredient = {this.removeIngredientHandler}
                                disable = {disableInfo}
                                price = {this.state.totalPrice}
                                purchasable = {this.state.purchasable}
                                order = {this.updatePurchasingHandler}/>
            </Aux>
        )
    }

}
export default BurgerBuilder;