import { AxiosError } from "axios";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  let errorMessage = "An unexpected error has occurred.";
  let errorStatus = "Something went wrong :(";

  if (isRouteErrorResponse(error)) {
    errorStatus = `[${error.status}] ${error.statusText}`;
    switch (error.status) {
      case 404:
        errorMessage =
          "Oops, it looks like the page you're looking for doesn't exist.";
        break;
    }
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      errorStatus = `[${error.response.status}] ${error.response.statusText}`;
      switch (error.response.status) {
        case 404:
          errorMessage =
            "Oops, it looks like the page you're looking for doesn't exist.";
          break;
        case 403:
          errorMessage = "You are not authorized to view this page.";
          break;
      }
    }
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

export default Error;
