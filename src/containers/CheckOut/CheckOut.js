import React, {Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      //  ['salad', 1]
      if (param[0] === 'price') {
        this.setState({price: param[1]})
      } else {
        ingredients[param[0]] = +param[1]; // +'4' makes '4' become an int 4
      }

    }
    this.setState({ingredients: ingredients});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render () {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        {/*<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>*/}
        <Route path={this.props.match.path + '/contact-data'}
               render={(props) => {
                 return <ContactData
                   price={this.state.price}
                   ingredients={this.state.ingredients}
                   {...props}/>
               }}/>
      </div>

    )
  }
}

export default CheckOut;