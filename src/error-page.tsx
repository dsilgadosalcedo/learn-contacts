import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="w-full flex flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="font-medium text-orange-400">
        {/* @ts-expect-error Library does not specify types */}
        {error.statusText || error.message}
      </p>
    </div>
  );
}