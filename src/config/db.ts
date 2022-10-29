import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  players?: Array<string>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  players: { type: [String] },
});

const User = model<IUser>("user", userSchema);
export default User;