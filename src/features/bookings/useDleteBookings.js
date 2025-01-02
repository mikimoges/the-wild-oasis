import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingsApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBookings() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingsApi,
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteBooking, isDeleting };
}
