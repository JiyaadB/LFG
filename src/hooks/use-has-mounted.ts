import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True once the component has hydrated on the client, false during SSR and
 * the first client render. Prevents hydration-mismatch flicker (e.g. reading
 * `resolvedTheme`) without a setState-in-effect mount flag.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
