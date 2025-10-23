export const metadata = {
  title: "Contact — AUREON CAPITAL LIMITED",
};

export default function Page() {
  return (
    <div className="space-y-10 max-w-3xl">
      <header className="space-y-4">
        <h1 className="h1">Get In Touch</h1>
        <p className="p-lg">
          For partnership inquiries, consulting requests, or collaboration proposals, reach our team through the channels below. We respond to all inquiries within two business days.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-3 text-gray-300">
          <h2 className="text-lg font-semibold text-white">Registered Office</h2>
          <p>Unit 2A, 17/F, Glenealy Tower<br />No.1 Glenealy, Central, Hong Kong</p>
          <p>Business Registration No. 78966763</p>
        </div>
        <div className="card space-y-3 text-gray-300">
          <h2 className="text-lg font-semibold text-white">Primary Contacts</h2>
          <p>
            Email:<br />
            contact@aureoncapitallimited.com<br />
            partnerships@aureoncapitallimited.com
          </p>
          <p>Phone (HK): +852 3106 3896</p>
        </div>
      </section>

      <section className="card space-y-3 text-gray-300">
        <h2 className="text-lg font-semibold text-white">Engagement Coordination</h2>
        <p>
          Please include mandate objectives, jurisdictional considerations, and preferred timelines. Our coordination desk will schedule an introductory session with the relevant practice leads.
        </p>
        <p className="text-sm text-gray-400">
          Confidential data should be shared through secure data rooms established after onboarding. We do not request wallet keys or sensitive credentials via email.
        </p>
      </section>
    </div>
  );
}