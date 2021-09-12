import AddPayment from '../../components/rooms/navbar/addPayment';
import PaymentHistory from '../../components/rooms/navbar/paymentHistory';

import React from 'react';


class Navbar extends React.Component {
  render() {
    const users = this.props.users;
    const payments = this.props.payments;
    const roomId = this.props.roomId;
    return (
      <nav className="sticky top-0 z-10">
        <div className="max-w-8xl mx-auto px-6">
          <div className="relative flex items-center h-16">
            <div className="w-1/3 md:w-1/6">
              <h1 className="text-gray-600 text-3xl">Shamo</h1>
            </div>
            <div className="w-2/3 md:w-5/6">
              <div className="mt-1 sm:ml-6 flex justify-end space-x-2">
                <AddPayment roomId={roomId} users={users} />
                <PaymentHistory roomId={roomId} users={users} payments={payments} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
