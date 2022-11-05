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
              name: "affordance",
              title: "Digital affordans",
              type: "reference",
              to: [{ type: "digital_affordance" }],
            },
            {
              title: "Evaluering",
              name: "challenges",
              type: "array",
              of: [
                { type: "challenge_evaluation" }
              ]
            },
            /*
            {
              name: "challenge",
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
              name: "comment",
              type: "text",
              title: "Kommentar",
            },
            {
              name: "screenshot",
              type: "image",
              title: "Skjermdump",
            },*/
          ],
          preview: {
            select: {
              title: "affordance.title",
              subtitle: "challenges.0.challenge.title",
              media: "challenges.0.screenshot",
              score: "challenges.0.score",
              subtitle1: "challenges.1.challenge.title",
              score1: "challenges.1.score",
              subtitle2: "challenges.2.challenge.title",
              score2: "challenges.2.score",
              subtitle3: "challenges.3.challenge.title",
              score3: "challenges.3.score",
              subtitle4: "challenges.4.challenge.title",
              score4: "challenges.4.score",
              subtitle5: "challenges.5.challenge.title",
              score5: "challenges.5.score",
            },
            prepare: (data) => {
              if (data.done) { // eh, Sanity
                return data;
              }
              const subtitles = []
              if (data.subtitle) {
                subtitles.push(data.subtitle + ' - ' + data.score);
              }
              for (let i = 1; i < 6; i++) {
                if (data['subtitle' + i]) {
                  subtitles.push(data['subtitle' + i] + ' - ' + data['score' + i]);
                }
              }
              data.subtitle = subtitles.join(', ');
              data.done = true;
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
