const OFFERS_STORAGE_KEY = "bamb-company-offers";

/** Normaliza ofertas antiguas y nuevas a una estructura común para la interfaz. */
export function normalizeOffer(offer) {
  const totalQuantity = Number(offer.totalQuantity ?? offer.quantity ?? 0);
  const remainingQuantity = Number(
    offer.remainingQuantity ?? offer.remaining ?? totalQuantity
  );

  return {
    ...offer,
    id: offer.id ?? crypto.randomUUID(),
    name: offer.name || offer.title || "Oferta sin nombre",
    title: offer.title || offer.name || "",
    description: offer.description || "",
    startDate: offer.startDate || "",
    endDate: offer.endDate || "",
    totalQuantity,
    remainingQuantity,
    quantity: totalQuantity,
    remaining: remainingQuantity,
    status: offer.status || "active",
  };
}

export function loadOffers(fallbackOffers = []) {
  try {
    const stored = localStorage.getItem(OFFERS_STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed.map(normalizeOffer);
    }

    const normalizedFallback = fallbackOffers.map(normalizeOffer);
    if (normalizedFallback.length) saveOffers(normalizedFallback);
    return normalizedFallback;
  } catch (error) {
    console.error("No fue posible leer las ofertas de Bamb:", error);
    return fallbackOffers.map(normalizeOffer);
  }
}

export function saveOffers(offers) {
  localStorage.setItem(
    OFFERS_STORAGE_KEY,
    JSON.stringify(offers.map(normalizeOffer))
  );
}
