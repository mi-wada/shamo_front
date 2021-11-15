import React from 'react';

class User extends React.Component {
  render() {
    const user = this.props.user;
    const payments = this.props.payments;
    const totalPrice = (typeof payments !== "undefined") ? payments.filter(payment => payment.user_id === user.id).reduce((acc, cur) => acc + cur.price, 0) : 0;
    return (
      <div className="w-full md:w-1/2 px-2">
        <div className="rounded-lg shadow-sm mb-4">
          <div className="rounded-lg bg-white hover:bg-gray-100 shadow-xl relative overflow-hidden">
            <div className="px-3 pt-8 pb-10 text-center relative">
              <h4 className="text-sm uppercase text-gray-500 leading-tight">{user.name}</h4>
              <h3 className="text-3xl text-gray-700 font-semibold leading-tight mt-5">{totalPrice.toLocaleString()}</h3>
            </div>
            <div className="absolute bottom-0 inset-x-0">
              <canvas id="chart3" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
