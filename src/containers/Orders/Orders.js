import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount () {
    axios.get('/orders.json')
      .then(res => {
      console.log(res.data);
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      this.setState({loading: false, orders: fetchedOrders});
      console.log(this.state.orders);
      console.log(123);
    }).catch(err => {
      this.setState({loading: false});
    });
  }

  render () {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order price={order.price} key={order.id} ingredients={order.ingredients}/>
        ))}
      </div>
    )
  }
}

export default Orders;