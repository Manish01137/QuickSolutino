"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Handshake, Send } from "lucide-react";

const FORMS = [
  {
    key: "customer",
    tab: "Customer Inquiry",
    icon: Building2,
    description: "Tell us what IT infrastructure support your business needs.",
    recipient: "sales@quick-solutions.in",
    submitLabel: "Send Customer Inquiry",
  },
  {
    key: "partner",
    tab: "Partner With Us",
    icon: Handshake,
    description: "Join our delivery network or explore a partnership with Quick Solutions.",
    recipient: "partnermanagement@quick-solutions.in",
    submitLabel: "Send Partner Inquiry",
  },
] as const;

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-alt-bg)] px-3.5 py-3 text-sm font-normal text-[var(--color-ink)] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[0.8125rem] font-semibold text-[var(--color-ink)]">
      {label}
      {required && <span className="text-[var(--color-primary)]"> *</span>}
      <input type={type} name={name} required={required} placeholder={placeholder} className={inputClass} />
    </label>
  );
}

export function ContactForms() {
  const [active, setActive] = useState(0);
  const form = FORMS[active];

  return (
    <div
      id="contact-forms"
      className="scroll-mt-28 rounded-[28px] border border-white bg-white/90 p-2 shadow-[0_40px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-2.5"
    >
      <div role="tablist" aria-label="Inquiry type" className="grid grid-cols-2 gap-1 rounded-[20px] bg-[var(--color-alt-bg)] p-1">
        {FORMS.map((f, i) => {
          const selected = i === active;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`relative z-10 flex items-center justify-center gap-2 rounded-2xl px-2 py-3 text-[0.8125rem] font-semibold transition-colors duration-300 sm:text-sm ${
                selected ? "text-[var(--color-primary)]" : "text-[var(--color-body)] hover:text-[var(--color-ink)]"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="contact-tab-pill"
                  className="absolute inset-0 -z-10 rounded-2xl bg-white shadow-[0_8px_20px_-12px_rgba(15,23,42,0.35)] ring-1 ring-[var(--color-border)]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <f.icon className="h-4 w-4 shrink-0" />
              {f.tab}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.form
          key={form.key}
          action={`mailto:${form.recipient}`}
          method="post"
          encType="text/plain"
          className="px-3.5 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm leading-relaxed text-[var(--color-body)]">{form.description}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field label="Company" name="company" placeholder="Company name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
            <Field label="Phone" name="phone" type="tel" placeholder="Your phone number" />
          </div>

          <label className="mt-4 block text-[0.8125rem] font-semibold text-[var(--color-ink)]">
            Message<span className="text-[var(--color-primary)]"> *</span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="How can we help?"
              className={`${inputClass} resize-y`}
            />
          </label>

          <button
            type="submit"
            className="btn-shine group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_-10px_rgba(214,32,39,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-primary-dark)] sm:w-auto"
          >
            {form.submitLabel}
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}
