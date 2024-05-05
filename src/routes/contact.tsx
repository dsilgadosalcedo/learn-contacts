/* eslint-disable react-refresh/only-export-components */

import { 
  Form, 
  useLoaderData,
  useFetcher
  } from "react-router-dom";
import { 
  Contact as ContactType, 
  getContact, 
  updateContact 
} from "../contacts";
import { LoaderFunction, ActionFunction } from "react-router-dom";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export const loader: LoaderFunction = async ({ params }) => {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "We couldn't find this contact",
    });
  }
  return { contact };
}

export default function Contact() {
  // @ts-expect-error I don't understand this
  const { contact } = useLoaderData();

  return (
    <div id="contact" className="flex gap-4">
      <div className="w-36 h-36 rounded-xl bg-gray-800 overflow-hidden">
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          
        />
      </div>

      <div className="flex flex-col">
        <h1 className="flex gap-2 text-2xl font-semibold">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              className="text-lg font-semibold text-indigo-300"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p className="text-gray-300">{contact.notes}</p>}

        <div className="flex gap-2 flex-grow items-end">
          <Form action="edit">
            <button type="submit" className="py-1 px-3 shadow shadow-indigo-600 hover:bg-blue-400/30 transition-colors rounded-lg">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="py-1 px-3 shadow shadow-indigo-600 hover:bg-red-500/20 transition-colors rounded-lg">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: ContactType}) {
  const fetcher = useFetcher();

  let favorite: boolean = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        className="text-yellow-300"
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}