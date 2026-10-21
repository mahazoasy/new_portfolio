'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Phone, Send
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import Reveal, { EASE } from '@/components/motion/Reveal';

type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'peer w-full rounded-2xl border border-border bg-card-2 px-4 pb-3 pt-6 text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-transparent hover:border-border-strong focus:border-accent focus:bg-card focus:shadow-[0_0_0_4px_var(--accent-soft)]';

const labelClass =
  'pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent';

export default function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const channels = [
    {
      href: 'mailto:mahazoasyheritiana@gmail.com',
      icon: Mail,
      label: 'Email',
      value: 'mahazoasyheritiana@gmail.com'
    },
    {
      href: 'tel:+261387684280',
      icon: Phone,
      label: t('phone'),
      value: '+261 38 76 842 80'
    },
    {
      href: 'https://github.com/mahazoasy',
      icon: FaGithub,
      label: t('github'),
      value: 'github.com/mahazoasy',
      external: true
    },
    {
      href: 'https://www.linkedin.com/in/mahazoasy-judicael',
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/mahazoasy-judicael',
      external: true
    }
  ];

  return (
    <section id="contact" className="relative px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 md:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col">
                <p className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-accent">
                  <span aria-hidden className="h-px w-6 bg-accent" />
                  {t('title')}
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-balance text-gradient md:text-6xl">
                  {t('subtitle')}
                </h2>

                <ul className="mt-10 divide-y divide-border border-y border-border">
                  {channels.map(({ href, icon: Icon, label, value, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-4 py-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card-2 text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                          <Icon size={17} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-faint">{label}</span>
                          <span className="block truncate text-sm font-medium text-foreground">{value}</span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                        />
                      </a>
                    </li>
                  ))}
                  <li className="flex items-start gap-4 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card-2 text-muted">
                      <MapPin size={17} />
                    </span>
                    <span>
                      <span className="block text-xs text-faint">{t('location')}</span>
                      <span className="block text-sm font-medium leading-relaxed text-foreground">
                        Toamasina I, Atsinanana, Madagascar
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-3xl border border-border bg-background/60 p-4 backdrop-blur-xl md:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder={t('name')} className={fieldClass} />
                    <label htmlFor="contact-name" className={labelClass}>{t('name')}</label>
                  </div>
                  <div className="relative">
                    <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder={t('email')} className={fieldClass} />
                    <label htmlFor="contact-email" className={labelClass}>{t('email')}</label>
                  </div>
                </div>
                <div className="relative flex-1">
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={7}
                    placeholder={t('message')}
                    className={`${fieldClass} h-full min-h-[200px] resize-none`}
                  />
                  <label htmlFor="contact-message" className={labelClass}>{t('message')}</label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-foreground px-6 font-medium text-background transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> {t('sending')}
                    </>
                  ) : (
                    <>
                      {t('send')}
                      <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div aria-live="polite" className="min-h-6">
                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.p
                        key="success"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex items-center gap-2 text-sm text-success"
                      >
                        <CheckCircle2 size={16} /> {t('success')}
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex items-center gap-2 text-sm text-danger"
                      >
                        <AlertCircle size={16} /> {t('error')}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}