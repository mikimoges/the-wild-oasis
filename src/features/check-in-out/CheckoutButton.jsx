import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      $variation="primary"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
      size="small"
    >
      {!isCheckingOut ? "Check out" : <SpinnerMini />}
    </Button>
  );
}

export default CheckoutButton;
