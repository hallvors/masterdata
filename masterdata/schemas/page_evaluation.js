export default {
  type: "document",
  name: "page_evaluation",
  title: "Vurdering av side",
  fields: [
    {
      name: "level",
      type: "number",
      title: "Klassetrinn",
    },
    {
      name: "chapterpage",
      type: "string",
      title: "Kapittel.side",
    },
    {
      name: "evaluations",
      type: "array",
      title: "Sideevaluering",
      of: [
        {
          type: "object",
          name: "eval",
          title: "Evaluering",
          fields: [
            {
              name: "challenge",
              type: "reference",
              to: [{ type: "didactic_challenge" }],
            },
            {
              name: "affordance",
              type: "reference",
              to: [{ type: "digital_affordance" }],
            },
            {
              name: "score",
              type: "number",
              title: "Klassifisering",
              description:
                "0: brukes negativt - motarbeider målet, 1: har ingen effekt,  2: brukes svakt, 3: brukes vellykket",
            },
            {
              name: "comment",
              type: "text",
              title: "Kommentar",
            },
            {
              name: "screenshot",
              type: "image",
              title: "Skjermdump",
            },
          ],
          preview: {
            select: {
              title: "challenge.title",
              subtitle: "affordance.title",
              media: "screenshot",
              score: "score",
            },
            prepare: (data) => {
              if (
                data.score !== undefined &&
                data.title &&
                data.title.indexOf(" - " + data.score) === -1
              ) {
                data.title += " - " + data.score;
              }
              return data;
            },
          },
        },
      ],
    },
    {
      name: "screenshot",
      type: "image",
      title: "Skjermdump",
    },
  ],
};
