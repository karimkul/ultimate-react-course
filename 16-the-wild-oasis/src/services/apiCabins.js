import supabase, { supabaseUrl } from "./supabase";

// Function to delete a cabin and its associated bookings
export async function deleteCabin(id) {
    console.log("Attempting to delete cabin with ID:", id);

    // Step 1: Delete bookings associated with this cabin
    const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .delete()
        .eq("cabinId", id); // Make sure to delete all bookings related to the cabin

    if (bookingsError) {
        console.error("Error deleting bookings:", bookingsError);
        throw new Error("Could not delete associated bookings.");
    }

    console.log("Successfully deleted bookings:", bookingsData);

    // Step 2: Delete the cabin itself
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error("Error deleting cabin:", error);
        throw new Error("Cabin could not be deleted.");
    }

    console.log("Successfully deleted cabin:", data);

    return data;
}

// Function to get all cabins
export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

// Function to create or edit a cabin
export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabase);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins");

    // A) Create cabin if no id exists
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) Edit cabin if id exists
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be created or updated");
    }

    // Upload the cabin image

    if (hasImagePath) return data;
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin not created or updated"
        );
    }

    return data;
}
