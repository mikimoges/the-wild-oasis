import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingUser } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      // console.log(user.user);
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
      toast.success("Login success.");
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Provided email or password is not correct.");
    },
  });

  return { login, isLoggingUser };
}
