import PropTypes from "prop-types";
import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "./FormRow";

function CreateCabinForm({ cabinToEdit }) {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("the new Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  console.log(errors);

  function onSubmit(data) {
    // console.log(data);
    // console.log({ ...data, image: data.image[0] });
    mutate({ ...data, image: data.image[0] });
  }
  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          disabled={isCreating}
          style={errors?.name && { borderColor: "red", outline: "red" }}
          type="text"
          id="name"
          {...register("name", {
            required: "You must fill this field to submit the form",
          })}
        />
      </FormRow>
      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "You must fill this field to submit the form",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "You must fill this field to submit the form",
            min: {
              value: 1,
              message: "Regular price can not be less than 1",
            },
          })}
        />
      </FormRow>
      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "You must fill this field to submit the form",
            validate: (value) =>
              getValues().regularPrice >= value ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        error={errors?.description?.message}
        label="Description for website"
      >
        <Textarea
          disabled={isCreating}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "You must fill this field to submit the form",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          {...register("image", {
            required: "You must upload image to create a new cabin",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} variation="primary" size="medium">
          {cabinToEdit
            ? "Edit Cabin"
            : `${isCreating ? "please wait......" : "Add cabin"}`}
        </Button>
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "You must fill this field to submit the form",
          })}
        />
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow2> */}
    </Form>
  );
}
CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
};
export default CreateCabinForm;
