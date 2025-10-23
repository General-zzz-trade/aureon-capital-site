export const metadata = {
  title: "Contact — AUREON CAPITAL LIMITED",
};

const contacts = [
  {
    label: "General Enquiries",
    email: "contact@aureoncapitallimited.com",
  },
  {
    label: "Partnerships",
    email: "partnerships@aureoncapitallimited.com",
  },
  {
    label: "Media & Speaking",
    email: "press@aureoncapitallimited.com",
  },
];

const regionalDesks = [
  {
    region: "Asia-Pacific",
    focus: "Coverage for Hong Kong, Singapore, Tokyo, and Sydney with bilingual research support.",
    hours: "08:00–20:00 HKT",
  },
  {
    region: "Middle East",
    focus: "Advisory for Abu Dhabi, Dubai, and Riyadh focused on market structure and regulatory design.",
    hours: "09:00–18:00 GST",
  },
  {
    region: "Europe",
    focus: "Support for Luxembourg, Frankfurt, and London on governance, custody, and investor communications.",
    hours: "08:00–17:00 CET",
  },
];

export default function Page() {
  return (
    <div className="space-y-12 max-w-4xl">
      <header className="space-y-6">
        <p className="eyebrow">Connect</p>
        <h1 className="heading-lg text-ink">Partner with Aureon Capital.</h1>
        <p className="copy-lg">
          We welcome conversations with institutional investors, digital asset operators, corporates, and policymakers seeking a
          research-driven partner. Share your objectives and we will align the right team.
        </p>
      </header>

      <section className="card space-y-6">
        <div>
          <h2 className="heading-md text-ink text-2xl">Registered Office</h2>
          <p className="text-sm text-muted leading-relaxed">
            Unit 2A, 17/F, Glenealy Tower<br />No.1 Glenealy, Central, Hong Kong
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 text-sm text-muted">
          {contacts.map((item) => (
            <div key={item.email} className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">{item.label}</p>
              <a href={`mailto:${item.email}`} className="link text-sm">
                {item.email}
              </a>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6 text-sm text-muted leading-relaxed">
          <p>
            Please include information about your organisation, objectives, and timelines so that we can coordinate the most
            relevant specialists. We respond to all inbound requests within two business days.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="heading-md text-ink">Regional desks</h2>
        <div className="grid gap-6 md:grid-cols-3 text-sm text-muted">
          {regionalDesks.map((desk) => (
            <div key={desk.region} className="card h-full space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">{desk.region}</p>
                <p className="text-sm text-muted leading-relaxed">{desk.focus}</p>
              </div>
              <p className="text-xs text-muted">Hours: {desk.hours}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-muted space-y-4">
        <h2 className="heading-md text-ink">Collaboration Guidelines</h2>
        <p className="text-sm text-muted leading-relaxed">
          We prioritise engagements that combine strategic advisory with measurable implementation outcomes. When reaching out,
          please outline the governance stakeholders, decision timelines, and desired deliverables so we can scope the right
          mandate structure.
        </p>
      </section>
    </div>
  );
}
