import PropTypes from "prop-types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "./FormRow";
import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";

function CreateEditCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // create Mutate
  const { isCreating, createCabin } = useCreateCabin();
  // edit mutate
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isCreating;

  // console.log(errors);

  function onSubmit(data) {
    // console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.(); //optional calling function if it is exist only
          },
        }
      );
    }
    // console.log({ ...data, image: data.image[0] });
    // mutate({ ...data, image: data.image[0] });
  }
  function onError(err) {
    console.log(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label="Cabin name">
        <Input
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession
              ? false
              : "You must upload image to create a new cabin",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          size="medium"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          {/* () => onCloseModal?.() we make it like this we call the function like this to do to create a bug if this form is used another place without passing the prop */}
          Cancel
        </Button>
        <Button disabled={isWorking} $variation="primary" size="medium">
          {isEditSession
            ? "Edit Cabin"
            : `${isWorking ? "please wait......" : "Add cabin"}`}
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
CreateEditCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};
export default CreateEditCabinForm;
