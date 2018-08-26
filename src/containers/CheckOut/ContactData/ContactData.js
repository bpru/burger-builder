import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({loading: true});
    const orderData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      orderData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: orderData
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => this.setState({loading: false}));
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedOrderElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedOrderElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedOrderElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render () {
    const inputElementArray = [];
    for (let key in this.state.orderForm) {
      inputElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElementArray.map(inputElement => (
          <Input
            key={inputElement.id}
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            changed={(event) => this.inputChangedHandler(event, inputElement.id)}/>
        ))}
        {/*<Input  elementType={...} elementConfig={...} value={...}/>*/}
        {/*<Input  inputtype='input' type="email" name='email' placeholder='Your Email'/>*/}
        {/*<Input  inputtype='input' type="text" name='street' placeholder='Your Street'/>*/}
        {/*<Input  inputtype='input' type="text" name='postalCode' placeholder='Your Postal Code'/>*/}
        <Button btnType='Success'>ORDER</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Yout Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;