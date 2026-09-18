// The product's offers, built once from the resolved pricing copy and used by
// both / and /priser. The two pages used to describe the same product as two
// entities (a SoftwareApplication with two offers on the homepage, a Product
// with five on /priser, `offerCount: 3` on top), so a crawler saw two prices
// for one thing. Now both emit the one #software entity with this offer set.
import type { PricingCopy } from "@/content/copy/pricing";
import { BASE_URL } from "@/lib/schema";

function offer(name: string, description: string, price: number) {
  return {
    "@type": "Offer",
    name,
    description,
    price: String(price),
    priceCurrency: "DKK",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(price),
      priceCurrency: "DKK",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "MON" },
      unitText: "MONTH",
    },
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/priser`,
  };
}

export function buildPricingOffers(copy: PricingCopy) {
  const { starter, premium } = copy.prices;
  const offers = [
    offer("Starter (årlig)", "qlim8 Starter ved årlig betaling.", starter.yearlyDkk),
    offer("Starter (månedlig)", "qlim8 Starter ved månedlig betaling.", starter.monthlyDkk),
    offer("Premium (årlig)", "qlim8 Premium ved årlig betaling.", premium.yearlyDkk),
    offer("Premium (månedlig)", "qlim8 Premium ved månedlig betaling.", premium.monthlyDkk),
    {
      "@type": "Offer",
      name: "Enterprise",
      description: "Custom volumen, supply-chain modul, SSO og dedikeret support. Kontakt for pris.",
      priceCurrency: "DKK",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/kontakt`,
    },
  ];
  return {
    "@type": "AggregateOffer",
    priceCurrency: "DKK",
    lowPrice: String(Math.min(starter.yearlyDkk, starter.monthlyDkk)),
    highPrice: String(Math.max(premium.yearlyDkk, premium.monthlyDkk)),
    offerCount: offers.length,
    offers,
  };
}
