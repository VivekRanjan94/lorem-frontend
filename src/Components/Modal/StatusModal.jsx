import React from 'react'
import useTimeout from '../../Hooks/useTimeout'
import { ReactComponent as Tick } from '../../Assets/tick.svg'
import { ReactComponent as Cross } from '../../Assets/cross.svg'

const StatusModal = ({ setShowModal, message, type }) => {
  useTimeout(() => {
    setShowModal(false)
  }, 5000)

  return (
    <div className='status-modal'>
      {type === 'success' ? (
        <>
          <Tick />
          <h2>Done!</h2>
          <p>{message}</p>
          <button
            onClick={() => {
              setShowModal(false)
            }}
          >
            OK
          </button>
        </>
      ) : (
        <>
          <Cross />
          <h2>Failed!</h2>
          <p>{message}</p>
          <button
            onClick={() => {
              setShowModal(false)
            }}
          >
            OK
          </button>
        </>
      )}
    </div>
  )
}

export default StatusModal
