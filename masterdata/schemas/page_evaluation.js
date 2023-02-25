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
      name: "screenshot",
      type: "image",
      title: "Skjermdump - hovedbilde",
    },
    {
      name: "url",
      type: "url",
      title: "URL",
    },
    {
      name: "evaluations",
      type: "array",
      title: "Affordanser (kommentert)",
      description: "Muligens også knyttet til spesifikke didaktiske mål, der det kan begrunnes",
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
                subtitles.push(data.subtitle + (data.score ? ' - ' + data.score : '' ));
              }
              for (let i = 1; i < 6; i++) {
                if (data['subtitle' + i]) {
                  subtitles.push(data['subtitle' + i] + (data['score' + i] ? ' - ' + data['score' + i] : ''));
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
      name: "goals",
      title: "Læreplanmål",
      type: "array",
      of: [{ type: "reference", to: [{type: "official_goal"}] }],
    },
    {
      name: "challenge",
      title: "Didaktiske utfordringer",
      description: "Andre didaktiske utfordringer (utover læreplanmål) som side ser ut til å ivareta. Begrunnes i kommentarfelt.",
      type: "array",
      of: [{ type: "reference", to: [{type: "didactic_challenge"}] }],
    },
    {
      name: "requires_teacher",
      type: "boolean",
      title: "Lærerstyrt",
      description: "I følge lærerveiledning er sida beregnet på å brukes som grunnlag for lærer-styrte aktiviteter",
    },
    {
      name: "collaborative",
      type: "boolean",
      title: "Tilrettelegger for samarbeid",
      description: "I følge lærerveiledning er sida beregnet på å brukes i gruppe-aktiviteter (ikke i plenum)",
    },
    {
      name: "comment",
      type: "text",
      title: "Kommentar",
    },
    {
      name: "screenshots",
      title: "Ekstra bilder",
      type: 'array',
      of: [{type: 'image'}]
    },
  ],
  orderings: [
    {
      title: 'Klasse og kapittel, stigende',
      name: 'levelChapterpage',
      by: [
        {
          field: 'level', direction: 'asc',
        },
        {
          field: 'chapterpage', direction: 'asc',
        },
      ]
    }

  ]
};
