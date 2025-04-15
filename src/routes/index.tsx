import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const isVisible = useSignal(false);
  useVisibleTask$(({ track }) => {
    track(() => isVisible.value);
    isVisible.value = true;
  });
  return <>{isVisible.value && <div>Visible</div>}</>;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
