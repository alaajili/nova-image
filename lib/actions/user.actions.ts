'use server'

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabse } from "../database/mongoose"
import { handleError } from "../utils";


// Create
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabse();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// Read
export async function getUserById(userId: string) {
  try {
    await connectToDatabse();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// Update
export async function updateUser(userId: string, user: UpdateUserParams) {
  try {
    await connectToDatabse();

    const updatedUser = await User.findOneAndUpdate(
      { userId }, 
      user,
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("User Update Failed");
    }
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// Delete
export async function deleteUser(userId: string) {
  try {
    await connectToDatabse();

    const userToDelete = await User.findOne({ userId });

    if (!userToDelete) {
      throw new Error("User Not Found");
    }

    const deletedUser = await User.findOneAndDelete(userToDelete._id);
    revalidatePath("/");
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}