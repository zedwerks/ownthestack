const EvidenceLayout = require("./_includes/layouts/evidence.11ty.js");

class EvidencePage {
  data() {
    return {
      pagination: {
        data: "evidenceNotes",
        size: 1,
        alias: "evidenceNote",
      },
      permalink: (data) => `/evidence/${data.evidenceNote.slug}/index.html`,
      tags: "evidence",
    };
  }

  render(data) {
    return new EvidenceLayout().render({
      ...data,
      ...data.evidenceNote,
      content: data.evidenceNote.html,
    });
  }
}

module.exports = EvidencePage;
