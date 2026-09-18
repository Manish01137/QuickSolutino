import Image from "next/image";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--color-dark-1)]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=75&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-1)] via-[var(--color-dark-1)]/95 to-[var(--color-dark-2)]/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-[28px] font-extrabold leading-tight text-white sm:text-[34px] lg:text-[38px]">
            Keep Your IT Infrastructure Running.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-300 sm:text-base">
            Whether you need 24x7 support, onsite engineers, hardware
            maintenance, project deployment or multi-country IT support,
            Quick Solutions is ready to help. Let&apos;s discuss how we can
            support your IT operations.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact" arrow>
              Talk to an IT Expert
            </Button>
            <Button href="#contact" variant="outline-dark" arrow>
              Request a Service
            </Button>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <ContactForm
            title="Customer Inquiry"
            description="Tell us what IT infrastructure support your business needs."
            recipient="sales@quick-solutions.in"
            submitLabel="Send Customer Inquiry"
          />
          <ContactForm
            title="Partner With Us"
            description="Join our delivery network or explore a partnership with Quick Solutions."
            recipient="partnermanagement@quick-solutions.in"
            submitLabel="Send Partner Inquiry"
          />
        </div>
      </div>
    </section>
  );
}

function ContactForm({
  title,
  description,
  recipient,
  submitLabel,
}: {
  title: string;
  description: string;
  recipient: string;
  submitLabel: string;
}) {
  return (
    <form
      action={`mailto:${recipient}`}
      method="post"
      encType="text/plain"
      className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm sm:p-8"
    >
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-200">
          Name
          <input
            name="name"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 font-normal text-white outline-none placeholder:text-slate-400 focus:border-white/50"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm font-semibold text-slate-200">
          Company
          <input
            name="company"
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 font-normal text-white outline-none placeholder:text-slate-400 focus:border-white/50"
            placeholder="Company name"
          />
        </label>
        <label className="text-sm font-semibold text-slate-200">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 font-normal text-white outline-none placeholder:text-slate-400 focus:border-white/50"
            placeholder="you@company.com"
          />
        </label>
        <label className="text-sm font-semibold text-slate-200">
          Phone
          <input
            type="tel"
            name="phone"
            className="mt-2 w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 font-normal text-white outline-none placeholder:text-slate-400 focus:border-white/50"
            placeholder="Your phone number"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-slate-200">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="mt-2 w-full resize-y rounded-lg border border-white/15 bg-white/10 px-3 py-2.5 font-normal text-white outline-none placeholder:text-slate-400 focus:border-white/50"
          placeholder="How can we help?"
        />
      </label>
      <button
        type="submit"
        className="mt-5 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
