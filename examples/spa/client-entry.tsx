import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { ParetoPage } from "@pareto/core";

const url = new URL(window.location.href);
const __csr = !!url.searchParams.get("__csr");

const startApp = async (Page: ParetoPage) => {
  const root = document.getElementById("main") as HTMLElement;
  await Page.setUpClient?.();
  const __INITIAL_DATA__ = window.__INITIAL_DATA__;

  if (__csr) {
    createRoot(root).render(
      <StrictMode>
        <Page initialData={__INITIAL_DATA__} />
      </StrictMode>
    );
    return;
  }

  hydrateRoot(
    root,
    <StrictMode>
      <Page initialData={__INITIAL_DATA__} />
    </StrictMode>
  );
};
export { startApp };