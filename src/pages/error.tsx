import { AxiosError } from "axios";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export const Unauthorized = new Error("Unauthorized");

const ERROR_404 =
  "Oops, it looks like the page you're looking for doesn't exist.";
const ERROR_403 = "You are not authorized to view this page.";
const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage = "An unexpected error has occurred.";
  let errorStatus = "Something went wrong :(";

  if (isRouteErrorResponse(error)) {
    errorStatus = `[${error.status}] ${error.statusText}`;
    switch (error.status) {
      case 404:
        errorMessage = ERROR_404;
        break;
    }
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      errorStatus = `[${error.response.status}] ${error.response.statusText}`;
      switch (error.response.status) {
        case 404:
          errorMessage = ERROR_404;
          break;
        case 403:
          errorMessage = ERROR_403;
          break;
      }
    }
  }

  if (error === Unauthorized) {
    errorStatus = `[403] Forbidden`;
    errorMessage = ERROR_403;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <img src="/ohno.png" className="m-auto mb-10 w-60" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {errorStatus}
        </h1>
        <p className="mt-4 text-muted-foreground">{errorMessage}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
