import React from "react"
import Modal from "react-modal"
import Router from "next/router"

Modal.setAppElement('#__next')

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '450px',
    height: '500px',
    border: 'none',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function PaymentHistory({ roomId, users, payments }) {
  const deletePayment = (payment_id) => {
    fetch(process.env.NEXT_PUBLIC_SHAMO_API_URL + 'rooms/' + roomId  + '/payments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Number(payment_id)
      })
    })
      .then(res => res.json().then(data => {
        Router.reload()
      }))
  }

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  let user_name_map = {};
  (users || []).forEach(user => user_name_map[user.ID] = user.Name);

  return (
    <>
      <div onClick={() => setModalIsOpen(!modalIsOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={modalStyle}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="table-fixed">
                  <thead className="bg-gray-400">
                    <tr>
                      <th className="w-4/12 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">Price</th>
                      <th className="w-4/12 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">Who</th>
                      <th className="w-4/12 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">What</th>
                      <th className="w-1/12 tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(payments || []).map(payment => (
                      <tr>
                        <td className="pl-5 py-4 break-all text-right text-sm text-gray-500">
                          {payment.price.toLocaleString()}
                        </td>
                        <td className="pl-5 py-4 break-all text-right text-sm text-gray-500">
                          {user_name_map[payment.user_id]}
                        </td>
                        <td className="pl-5 py-4 break-all text-right text-sm text-gray-500">
                          {payment.what}
                        </td>
                        <td className="pl-5">
                          <button onClick={() => deletePayment(payment.ID)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal >
    </>
  )
}
