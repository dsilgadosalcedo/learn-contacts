import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";
import { ActionFunction } from "react-router-dom";

export const action: ActionFunction = async ({ params }) => {
  await deleteContact(params.contactId);
  return redirect("/");
};