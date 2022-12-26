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
        title="Send Feedback"
      >
        { stage === 1 && (
          <>
            <div className="card-content pb-6">
              <form onSubmit={confirmFeedback}>
                <div className="card-content mx-auto mb-4">
                  <textarea 
                    name="feedback" 
                    id="form-feedback" 
                    cols="10" 
                    rows="10"
                    className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md"
                    placeholder="Write feedback here"
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
            <div className="card-content pb-6 text-center">
              <form onSubmit={submitFeedback}>
                <p>{feedback}</p>
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