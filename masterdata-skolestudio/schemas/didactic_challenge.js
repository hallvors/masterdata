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
      name: "source",
      title: "Kilde",
      options: {
        list: [
          "Kolstø, Naturfagdidaktikk",
          "Sinnes",
          "Læreplan",
        ],
      },
    },
  ],
};
