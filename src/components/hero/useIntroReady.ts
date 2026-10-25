"use client";

import { useSyncExternalStore } from "react";

// The intro loader marks <html> when it finishes (data-intro-done), and repeat
// visits are marked before paint (data-intro-seen). Hero animations wait for either.
const ATTRS = ["data-intro-done", "data-intro-seen"];

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ATTRS });
  return () => observer.disconnect();
}

function getSnapshot() {
  const el = document.documentElement;
  return ATTRS.some((a) => el.hasAttribute(a));
}

export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
