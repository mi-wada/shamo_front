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
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem'
  },
};

export default function AddPayment({ roomId, users }) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const submitPayment = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_SHAMO_API_URL + 'rooms/' + roomId + '/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price: Number(e.target.price.value),
        user_id: Number(e.target.who.value),
        what: e.target.what.value
      })
    })
      .then(res => res.json().then(data => {
        Router.reload()
      }))

    setModalIsOpen(false);
  }

  return (
    <>
      <div onClick={() => setModalIsOpen(!modalIsOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={modalStyle}>
        <div className="container mx-auto max-w-md transition duration-300">
          <form onSubmit={submitPayment} className="py-12 p-10 bg-white rounded-xl">
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="name">Price<span className="text-xs text-red-600">*</span></label>
              <input id="price" type="number" className="border bg-gray-100 py-2 px-4 w-72 outline-none focus:ring-2 focus:ring-gray-600 rounded" autoFocus placeholder="100" required />
            </div>
            <div className="mb-6">
              <label className="mr-5 text-gray-700 font-bold inline-block mb-2" for="name">Who<span className="text-xs text-red-600">*</span></label>
              <select id="who" className="border bg-gray-100 py-2 px-4 w-72 outline-none focus:ring-2 focus:ring-gray-600 rounded">
                {users.map(user => (
                  <option value={user.ID}>
                    {user.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mr-5 text-gray-700 font-bold inline-block mb-2" for="name">What</label>
              <input id="what" type="text" className="border bg-gray-100 py-2 px-4 w-72 outline-none focus:ring-2 focus:ring-gray-600 rounded" placeholder="coffee" />
            </div>
            <button className="w-full mt-6 text-white font-bold bg-gray-600 py-3 rounded-md hover:bg-gray-500 transition duration-300">SUBMIT</button>
          </form>
        </div>
      </Modal>
    </>
  )
}
