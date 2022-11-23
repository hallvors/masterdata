export default {
    type: "object",
    name: "challenge_evaluation",
    title: "Evaluering",
    fields: [
        {
            name: "challenge",
            title: "Didaktisk utfordring",
            type: "reference",
            to: [{ type: "didactic_challenge" }],
          },
          {
            name: "score",
            type: "number",
            title: "Klassifisering",
            description:
              "0: brukes negativt - motarbeider målet, 1: har ingen effekt,  2: brukes svakt, 3: brukes vellykket",
          },
          {
            name: "requires_teacher",
            type: "boolean",
            title: "Krever lærerinnsats",
            description: "I følge lærerveiledning er affordansen beregnet på å brukes som grunnlag for lærer-styrte aktiviteter",
          },
          {
            name: "collaborative",
            type: "boolean",
            title: "Tilrettelegger for samarbeid",
            description: "I følge lærerveiledning er affordansen beregnet på å brukes i gruppe-aktiviteter",
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
          //subtitle: "challenge.title",
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
}
