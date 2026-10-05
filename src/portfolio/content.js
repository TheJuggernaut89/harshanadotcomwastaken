export const projects = {
  marketing: [
    {
      id: 'cream', title: 'A familiar flavour. A fresh story.', category: 'Cream of Creams / Campaign design', status: 'DEMO', image: 'cheesecake', alt: 'Rose pistachio cheesecake campaign artwork',
      description: 'Product storytelling that brings Malaysian flavours into the frame.',
      sections: [
        ['The brief', 'Give a cheesecake range a recognisable local voice through product-led creative and social content.'],
        ['My contribution', 'Social media content, graphic design and video work for Cream of Creams. This selection brings together campaign artwork. The selected films above show the video work.'],
        ['The work', 'The collection pairs festive cheesecake batter creatives with rose pistachio and sopapilla cheesecake designs. Each uses a different visual treatment to bring the product into focus.'],
        ['Results and evidence', 'The campaign collection is shown here as work samples. Ask me about the brief, production process and campaign reporting.']
      ],
      gallery: [{ name: 'cream-social', alt: 'Cream of Creams social media design', caption: 'A selected social creative from the campaign collection.' }, { name: 'cream-festive', alt: 'Festive Biscoff cheesecake batter creative', caption: 'Festive product creative.' }, { name: 'cream-ai', alt: 'Sopapilla cheesecake recipe inspiration', caption: 'Sopapilla cheesecake creative.' }],
      video: 'cream-product', videoLabel: 'Cream of Creams product video'
    },
    {
      id: 'jungle', title: 'Let the place tell the story.', category: 'JungleWalla / Tourism & nature', status: 'DEMO', image: 'jungle', alt: 'A gibbon moving through a green forest canopy',
      description: 'Nature-led content for the people curious enough to explore.',
      sections: [
        ['The context', 'Nature tourism needs to help people understand an experience before they book it. My work at JungleWalla brought naturalist experience together with marketing communications.'],
        ['My contribution', 'Content and visual storytelling for eco-tourism experiences, connecting conservation education with the visitor’s perspective.'],
        ['What is shown', 'Selected media from the JungleWalla work collection. The images provide context for the role; they are not a claim that every photograph was taken by me.'],
        ['What I learnt', 'The details that make a place interesting to a visitor often come from listening and observing on the ground. That is where the communication starts.']
      ], video: 'jungle-film', videoLabel: 'Selected JungleWalla video from the work collection'
    },
    {
      id: 'visual', title: 'Room to try a different direction.', category: 'Visual studies / Product design', status: 'CONCEPT', image: 'cream-ai', alt: 'Sopapilla cheesecake product creative',
      description: 'A product-led visual direction from my Cream of Creams collection.',
      sections: [
        ['The intent', 'Explore a product-led visual direction. This supplied sopapilla cheesecake design brings the product, recipe inspiration and packaging into one composition.'],
        ['My approach', 'Consider the composition, wording and whether the finished piece serves the brief.'],
        ['Current status', 'Concept work. It is shown to discuss visual direction, not as evidence of a launched campaign or a measured commercial result.']
      ]
    }
  ],
  ai: [
    {
      id: 'axiom', title: 'Axiom Labs', category: 'My business / Automation', status: 'CONCEPT', visual: 'axiom',
      description: 'Business jobs, built on accounts the client owns. My service catalogue and approach to handover.',
      sections: [
        ['The problem', 'Routine enquiries, bookings and follow-ups can become a daily queue of manual work. A useful automation begins with one clearly defined job.'],
        ['My role', 'Founder and builder. I scope the workflow, establish where a person must check the work, and plan the handover on the client’s own accounts.'],
        ['What works today', 'The business website and service catalogue are live. The jobs on the board are labelled CONCEPT and built when commissioned. The catalogue is not a list of completed deployments.'],
        ['Where to go next', 'Axiom Labs carries the service scope, pricing, contract terms and commercial enquiry route. This portfolio is the introduction to me and my work.']
      ], link: 'https://axiomlabs.my/', linkLabel: 'Explore Axiom Labs'
    },
    {
      id: 'obiter', title: 'OBITER', category: 'Legal transcription / Review workflow', status: 'PILOT', workflow: 'transcript',
      description: 'A recording-to-review workflow with a person checking the transcript and its sources.',
      sections: [
        ['The problem', 'A transcript needs more than fluent text. Names, unclear passages, timestamps and quoted segments need careful review.'],
        ['My work', 'A software-supported transcription bureau workflow. The recording and filed papers inform a draft, which is checked and corrected before delivery.'],
        ['Human judgement', 'A person reviews the transcript and checks quoted material against the recording. Unclear speech and unidentified speakers remain flagged.'],
        ['Current status', 'Pilot, as labelled on Axiom Labs. The diagram here is an illustration of the process, not a product screenshot. No real case materials are shown.']
      ], link: 'https://obiter.my/', linkLabel: 'Explore OBITER'
    },
    {
      id: 'frontdesk', title: 'A front desk with a handover.', category: 'WhatsApp / Reply workflow', status: 'PROTOTYPE', workflow: 'reply',
      description: 'Draft from approved information. Hold uncertain answers. Let staff make the call.',
      sections: [
        ['The problem', 'A parent’s enquiry may need a routine answer, a missing detail or a member of the care team. Those paths should not be treated as interchangeable.'],
        ['The proposed workflow', 'Receive the enquiry, use approved information to draft a response, and ask staff to review before sending. Keep a record of the approved output.'],
        ['The boundary', 'Missing information pauses the reply. Health advice stays with the care team. The system is not presented as making clinical decisions.'],
        ['Current status', 'Prototype. This is an illustrative workflow with proposed checks, not a confirmed production integration.']
      ], link: 'https://axiomlabs.my/#proof', linkLabel: 'Read the workflow at Axiom Labs'
    }
  ]
};
export const experience = [
  { company: 'Axiom Labs', role: 'Founder & automation builder', description: 'I scope practical business automations, connect the tools, plan human review and document the handover. Axiom Labs brings this work into one business with clear project boundaries.' },
  { company: 'Cream of Creams', role: 'Social media & creative', description: 'Content planning, product storytelling, graphic design and video production for a food brand. I also explore how content workflows and tracking can reduce repetitive work behind the scenes.' },
  { company: 'JungleWalla Desaru', role: 'Naturalist & marketing communications', description: 'Naturalist work alongside marketing communications: making nature accessible to visitors, developing visual content and supporting tourism relationships. The lesson I carry forward is to make a subject interesting without losing what makes it true.' },
  { company: 'PServ', role: 'Customer service / Singapore', description: 'Handling visitor enquiries, communicating across cultures and supporting day-to-day service. This is where clear explanations and a calm response became part of my working habits.' },
  { company: 'Certis CISCO', role: 'Security operations / Singapore', description: 'Working within procedures, noticing risk and coordinating with people under pressure. That experience informs how I think about checks, exceptions and responsibility in an automated workflow.' }
];
export const capabilities = {
  marketing: [
    ['Find the story', 'Turn a brief and an audience into a clear direction for the content.', 'Content strategy / Social media / Brand communication'],
    ['Make the work', 'Bring an idea into images, video and a consistent visual language.', 'Photoshop / Illustrator / Premiere / After Effects'],
    ['Learn from it', 'Connect the creative decisions to the response, then refine the next piece.', 'Campaign review / Analytics / Content planning']
  ],
  ai: [
    ['Map the job', 'Identify the inputs, the decisions and the point where a person takes over.', 'Workflow design / Process mapping / Requirements'],
    ['Connect the parts', 'Build around the tools people use and the information they have approved.', 'n8n / APIs / JavaScript / Websites'],
    ['Make it maintainable', 'Check failure paths and leave practical notes for the next person.', 'Human review / Testing / Documentation / Handover']
  ]
};
