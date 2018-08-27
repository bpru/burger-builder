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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value: '',
        validation: {},
        valid: true,
        shouldValidate: false,
        touched: false
      },
    },
    loading: false,
    formIsValid: false
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

  checkValidity = (value, rules) => {
    let isValid = true;
    console.log(rules);
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {

      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedOrderElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedOrderElement.value = event.target.value;

    updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
    updatedOrderElement.touched = true;
    console.log(updatedOrderElement);
    updatedOrderForm[inputIdentifier] = updatedOrderElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    console.log(this.state.formIsValid);
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
            invalid={!inputElement.config.valid}
            shouldValidate={inputElement.config.shouldValidate}
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            touched={inputElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, inputElement.id)}/>
        ))}
        <Button
          disabled={!this.state.formIsValid}
          btnType='Success'>ORDER</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;