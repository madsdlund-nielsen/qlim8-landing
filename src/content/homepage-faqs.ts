export const HOMEPAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "Hvad er forskellen på qlim8 og en ESG-konsulent?",
    a: "En konsulent kommer 1-2 gange om året, fakturerer 80.000-200.000 kr og afleverer en PDF. qlim8 kører dagligt på dine egne data og koster fra 250 kr/md. Du beholder fuld kontrol — vi automatiserer det arbejde der er kedeligt og som alligevel skal laves manuelt hvert år.",
  },
  {
    q: "Er platformen klar til L193 (bankloven)?",
    a: "Ja. VSME Basis-rapporten på qlim8 er specifikt formateret til de ESG-felter danske pengeinstitutter beder om. Du eksporterer en standard-VSME og sender den direkte til din bankrådgiver.",
  },
  {
    q: "Hvad sker der med mine data?",
    a: "Vi er databehandler, du er dataansvarlig. Hosting sker hos Hetzner (Tyskland, EU). Du kan til enhver tid eksportere alle dine data i et standardformat eller slette din konto. Se vores privatlivspolitik for fuld detalje.",
  },
  {
    q: "Kan jeg bruge qlim8 hvis jeg ikke har et regnskabssystem koblet til?",
    a: "Ja. Du kan importere via CSV, og vi har en manuel posteringseditor. Men automatisering kræver en regnskabssystem-integration — vi understøtter Dinero, Billy og e-conomic.",
  },
  {
    q: "Hvor præcise er beregningerne?",
    a: "Vi bruger DEFRA, BEIS og Klimakompassets emissionsfaktorer og angiver datakvalitet (Tier 1-5) på hver post. På /metodologi kan du se præcis hvilke kilder vi bruger og hvordan vi beregner.",
  },
  {
    q: "Hvad sker der hvis jeg vil skifte væk fra qlim8?",
    a: "Du eksporterer dit klimaregnskab i VSME-format, plus rådata som CSV. Ingen lock-in. Ingen genforhandling. Du har 30 dage til at trække data ud efter opsigelse.",
  },
];

export const HOMEPAGE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
