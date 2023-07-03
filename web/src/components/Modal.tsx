import React from 'react'

interface ModalProps {
   id: string;
}

const Modal: React.FC<ModalProps> = ({ id }) => {
   const openModal = () => {
      const modalElement = document.getElementById(id) as HTMLDialogElement | null;
      if (modalElement) {
         modalElement.showModal();
      }
   };
   return (
      <>
         <button className="btn" onClick={openModal}>open modal</button>
         <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
               <h3 className="font-bold text-lg">Hello!</h3>
               <p className="py-4">Press ESC key or click the button below to close</p>
               <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
               </div>
            </form>
         </dialog>
      </>
   )
}
export default Modal