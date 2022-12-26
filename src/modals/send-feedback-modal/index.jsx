import React, { useContext, useState } from 'react'
import { ModalStateContext } from '../../context/ModalStateContext';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';
import useSendFeedback from '../../hooks/useSendFeedback';


const SendFeedbackModal = () => {
  const { closeModal } = useContext(ModalStateContext);
  const [stage, setStage] = useState(1); // 1 = write feedback, 2 = confirm
  const [feedback, setFeedback] = useState('');
  const sendFeedback = useSendFeedback();

  function confirmFeedback() {
    setStage(2);
  }

  async function submitFeedback(e) {
    e.preventDefault();
    sendFeedback.mutateAsync({feedback}).then(() => closeModal());
  }

  return (
    <>
      <ModalWrapperContainer
        onCloseClick={closeModal}
        title="Product Customer Feedback Form"
      >
        { stage === 1 && (
          <>
            <div className="card-content">
              <div className="mb-8">
                <p>Thank you for taking your timet to provide feedback. We appreciate hearing from you and will review your comments carefully.</p>
              </div>
              <hr />
              <form onSubmit={confirmFeedback} className="mt-8">
                <div className="card-content mx-auto mb-4">
                  <p>Do you have any suggestions to improve our product and service?</p>
                  <textarea 
                    name="feedback" 
                    id="form-feedback" 
                    cols="6" 
                    rows="10"
                    className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md my-2"
                    placeholder="..."
                    onChange={e => setFeedback(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex items-center justify-center">
                  <button 
                    type="submit"
                    onClick={confirmFeedback}
                    disabled={feedback.length === 0}
                    className="shadow-sm rounded-3xl px-6 py-2 my-2 bg-blue button-transition text-white flex"
                  >
                    <span>Confirm</span>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        { stage === 2 && (
          <>
            <div className="card-content">
              <form onSubmit={submitFeedback}>
                <div className="text-left max-w-[500px] mx-auto">
                  <p className="font-semibold mb-4">Do you have any suggestions to improve our product and service?</p>
                  <p>{feedback}</p>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button 
                    type="submit"
                    disabled={sendFeedback.isLoading}
                    className="shadow-sm rounded-3xl px-6 py-2 my-2 bg-blue button-transition text-white flex"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </ModalWrapperContainer>
    </>
  )
}

export default SendFeedbackModal