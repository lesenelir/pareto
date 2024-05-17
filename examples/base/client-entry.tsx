import superjson from "superjson";
import { StrictMode } from "react";
import { ParetoPage } from "@pareto/core";
import { hydrateRoot } from "react-dom/client";

const startApp = async (Page: ParetoPage) => {
  const root = document.getElementById("main") as HTMLElement;
  const __INITIAL_DATA__ = superjson.parse(window.__INITIAL_DATA__) as Record<string,any>;
  await Page.setUpClient?.();

  hydrateRoot(
    root,
    <StrictMode>
      <Page initialData={__INITIAL_DATA__} />
    </StrictMode>
  );
};
export { startApp };
