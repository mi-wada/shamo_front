import React from 'react';

import User from '../../components/rooms/user';

class Users extends React.Component {
  render() {
    const users = this.props.users;
    const payments = this.props.payments;

    return (
      <>
        <div className="min-w-screen flex items-center justify-center px-5 py-20">
          <div className="w-full max-w-3xl">
            <div className="-mx-2 flex">
              {users.map(user => (
                <User user={user} payments={payments} />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Users;
