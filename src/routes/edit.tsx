/* eslint-disable react-refresh/only-export-components */

import { 
  Form, 
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Contact, getContact, updateContact } from "../contacts";
import { LoaderFunction, ActionFunction } from "react-router-dom";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const updates: Partial<Contact> = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export const loader: LoaderFunction = async ({ params }) => {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function EditContact() {
  // @ts-expect-error I don't understand this
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form" className="flex flex-col gap-4">
      <p className="flex gap-4 items-center">
        <span className="w-36">Name</span>
        <div className="flex gap-4 w-full">
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact?.first}
            className="p-2 rounded-xl w-full"
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact?.last}
            className="p-2 rounded-xl w-full"
          />
        </div>
      </p>
      <label className="flex gap-4 items-center">
        <span className="w-36">Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
          className="p-2 rounded-xl w-full"
        />
      </label>
      <label className="flex gap-4 items-center">
        <span className="w-36 whitespace-nowrap">Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
          className="p-2 rounded-xl w-full"
        />
      </label>
      <label className="flex gap-4 items-center">
        <span className="w-36">Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
          className="p-2 rounded-xl w-full"
        />
      </label>
      <p className="flex gap-4 justify-end">
        <button 
          type="submit" 
          className="py-1 px-3 shadow shadow-indigo-600 hover:bg-blue-400/30 transition-colors rounded-lg"
        >
          Save
        </button>
        <button 
          type="button" 
          className="py-1 px-3 shadow shadow-indigo-600 hover:bg-blue-400/30 transition-colors rounded-lg"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
