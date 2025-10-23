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
];

export default function Page() {
  return (
    <div className="space-y-12 max-w-3xl">
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
        <div className="grid gap-4 sm:grid-cols-2 text-sm text-muted">
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
            relevant specialists.
          </p>
        </div>
      </section>
    </div>
  );
}
