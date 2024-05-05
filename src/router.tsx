import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { 
  Root, 
  Index,
  rootLoader, 
  rootAction, 
  Contact, 
  contactLoader,
  contactAction,
  EditContact,
  editLoader,
  editAction,
  deleteAction,
} from "./routes";
import ErrorPage from "./error-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route 
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={editLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={deleteAction}
        />
      </Route>
    </Route>
  )
);

export default router;

// [{
//   path: "/",
//   element: <Root />,
//   errorElement: <ErrorPage />,
//   loader: rootLoader,
//   action: rootAction,
//   children: [
//     {
//       errorElement: <ErrorPage />,
//       children: [
//         { index: true, element: <Index /> },
//         {
//           path: "contacts/:contactId",
//           element: <Contact />,
//           loader: contactLoader,
//           action: contactAction,
//         },
//         {
//           path: "contacts/:contactId/edit",
//           element: <EditContact />,
//           loader: editLoader,
//           action: editAction,
//         },
//         {
//           path: "contacts/:contactId/destroy",
//           action: deleteAction,
//         },
//       ],
//     }
//   ]
// },]