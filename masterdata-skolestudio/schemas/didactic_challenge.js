export default {
  type: "document",
  name: "didactic_challenge",
  title: "Didaktisk utfordring",
  fields: [
    {
      type: "string",
      name: "title",
      title: "Kort navn",
    },
    {
      type: "text",
      name: "description",
      title: "Beskrivelse",
    },
    {
      type: "string",
      name: "category",
      title: "Kategori",
      options: {
        list: [
          "Epistemiologiske mål",
          "Kognitive og metakognitive mål",
          "Sosiale mål",
          "Almenndannelse",
          "Tverrfaglig",
          "Virkemiddel (bruke eller ikke?)",
          "Fagspesifikk - fysikk",
          "Fagspesifikk - biologi",
          "Fagspesifikk - kjemi",
          "Fagspesifikk - geofag",
          "Fagspesifikk - astronomi",
        ],
      },
    },
    {
      type: "string",
      name: "didactic_category",
      title: "Ny didaktisk kategori",
      options: {
        list: [
          "Elev - produkt",
          "Elev - prosess",
          "Elev - fagovergripende",
          "Lærers - eksplisitt",
          "Lærers - implisitt",
        ],
      },
    },
    {
      type: "string",
      name: "source",
      title: "Kilde",
      options: {
        hidden: true,
        list: [
          "Kolstø, Naturfagdidaktikk",
          "Sinnes",
          "Læreplan",
        ],
      },
    },
  ],
};
