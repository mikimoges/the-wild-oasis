// import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button $variation="primary" size="medium">
            Add New Cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
        {/* Sample use of the modal to show the modal reusability in "Compound Pattern" 👇🔽🔻⏬*/}
        {/* <Modal.Open opens="cabin-table">
        <Button variation="primary" size="medium">
        Show Table
        </Button>
        </Modal.Open>
        <Modal.Window name="cabin-table">
        <CabinTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button
//         variation="primary"
//         size="medium"
//         onClick={() => setIsOpenModal((show) => !show)}
//       >
//         Add New Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//       {/* <Modal></Modal>; */}
//     </div>
//   );
// }

export default AddCabin;
