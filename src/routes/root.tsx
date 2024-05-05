import { useEffect } from "react";
import { 
  Form,
  Link,
  NavLink, 
  Outlet, 
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
  ActionFunction,
  LoaderFunction
} from "react-router-dom";
import { getContacts, createContact, Contact } from "../contacts";

export const action: ActionFunction = async () => {
  const contact: Contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export const loader: LoaderFunction = async ({ request }: { request: Request}) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts: Contact[] = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  // @ts-expect-error I don't understand this
  const { contacts, q }: { contacts: Contact[], q: string } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    const input = document.getElementById("q") as HTMLInputElement;
    input && (input.value = q);
  }, [q]);

  return (
    <>
      <div className="flex w-screen">
      <div id="sidebar" className="flex flex-col gap-2 border-r-2 border-gray-800 p-10 w-96 md:min-w-96">
        <h1 className="mb-4">Explore your <Link to="/" className="text-indigo-300 font-semibold">contacts</Link></h1>
        <div className="flex gap-2">
          <Form id="search-form" role="search" className="w-full">
            <span className="w-full flex items-center relative">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                className="p-2 pl-9 w-full border-2 border-gray-700 rounded-xl outline-none focus:border-indigo-800"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div className="w-6 h-6 absolute left-2">
                <svg className={searching ? "animate-spin" : "hidden"} aria-hidden viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(55 48 163)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                  <path d="M12 21c-3.314 0 -6 -2.462 -6 -5.5s2.686 -5.5 6 -5.5" />
                  <path d="M21 12c0 3.314 -2.462 6 -5.5 6s-5.5 -2.686 -5.5 -6" />
                  <path d="M12 14c3.314 0 6 -2.462 6 -5.5s-2.686 -5.5 -6 -5.5" />
                  <path d="M14 12c0 -3.314 -2.462 -6 -5.5 -6s-5.5 2.686 -5.5 6" />
                </svg>

                <svg className={searching ? "hidden" : ""} aria-live="polite" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(55 48 163)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
              </div>
            </span>
          </Form>
          <Form method="post">
            <button type="submit" className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-xl border-2 border-gray-700 hover:border-gray-600 transition-colors">New</button>
          </Form>
        </div>
        <hr className="border-gray-700 my-4" />
        <nav>
          { contacts.length ? (
            <ul className="flex flex-col gap-2">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink 
                    to={`contacts/${contact.id}`} 
                    className={({ isActive, isPending }) => {
                      const baseClass = "flex p-2 transition-colors rounded-xl w-full";
                      
                      if (isActive) {
                        return `${baseClass} bg-gray-600 font-medium`;
                      } else if (isPending) {
                        return `${baseClass} bg-gray-700`;
                      } else {
                        return `${baseClass} bg-gray-800 hover:bg-gray-700`;
                      }
                    }}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite && <span>&thinsp;★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        className={`transition-opacity duration-300 flex flex-col gap-2 h-screen p-10 w-full ${
          navigation.state === "loading" ? "opacity-30" : "opacity-100"
        }`}
      >
        <Outlet />
      </div>
    </div>
    </>
  );
}
