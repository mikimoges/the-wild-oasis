import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const {
    isPending: isCreating,
    mutate: createCabin,
    status: myPromise,
  } = useMutation({
    mutationFn: createEditCabin,
    // onMutate: () => {
    //   toast.promise(myPromise, {
    //     loading: "Loading",
    //     success: "Got the data",
    //     error: "Error when fetching",
    //   });
    // },
    onSuccess: () => {
      toast.success("the new Cabin successfully created");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
