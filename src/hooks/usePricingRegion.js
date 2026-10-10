import { useEffect, useState } from "react";
import { resolvePricingRegionFromCountryCode } from "../data/price";

const CACHE_KEY = "hourmaker_pricing_region";

async function fetchCountryCodeFromIp() {
  const response = await fetch("https://ipwho.is/", { method: "GET" });
  if (!response.ok) {
    throw new Error("Geo lookup failed");
  }
  const data = await response.json();
  if (data.success === false) {
    throw new Error(data.message || "Geo lookup failed");
  }
  return data.country_code;
}

/**
 * IN for India IP; US for all other locations (international USD list prices).
 * Used on marketing/pricing pages only — not on trial signup validation.
 */
export function usePricingRegion() {
  const [pricingRegion, setPricingRegion] = useState("IN");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached === "IN" || cached === "US") {
      setPricingRegion(cached);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const countryCode = await fetchCountryCodeFromIp();
        const region = resolvePricingRegionFromCountryCode(countryCode);
        sessionStorage.setItem(CACHE_KEY, region);
        if (!cancelled) {
          setPricingRegion(region);
        }
      } catch {
        sessionStorage.setItem(CACHE_KEY, "US");
        if (!cancelled) {
          setPricingRegion("US");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { pricingRegion, isLoading };
}
