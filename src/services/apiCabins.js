import { data } from "react-router-dom";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  //   console.log("data...............", data);
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error deleting cabin please try again!");
  }
  return data;
}

export async function createCabin(newCabin) {
  // https://wlzeuufmlymogunryrzu.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  // 1.create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Error adding a new cabin please try again!");
  }
  // if every thing is okay upload image
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Error Uploading the cabin image the cabin was not created please try again!"
    );
  }

  return data;
}
export async function createEditCabin(newCabin, id) {
  // check if already has image path or image not edited for editSession
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // https://wlzeuufmlymogunryrzu.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // 1.create the cabin
  let query = supabase.from("cabins");
  // create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]).select();
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Error adding a new cabin please try again!");
  }
  // if alredy uploaded image no need to upload using the url
  if (hasImagePath) return;
  // if every thing is okay upload image
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Error Uploading the cabin image the cabin was not created please try again!"
    );
  }

  return data;
}
