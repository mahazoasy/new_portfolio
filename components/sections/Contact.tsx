'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

export default function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
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
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 px-10 bg-[#0d0d14]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-gray-400">{t('subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <a
              href="mailto:mahazoasyheritiana@gmail.com "
              className="flex items-center gap-4 bg-[#14141c] border border-[#262633] rounded-xl p-4 card-hover"
            >
              <Mail className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-gray-200 text-sm">	mahazoasyheritiana@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+261380836502"
              className="flex items-center gap-4 bg-[#14141c] border border-[#262633] rounded-xl p-4 card-hover"
            >
              <Phone className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">{t('phone')}</p>
                <p className="text-gray-200 text-sm">+261 33 66 030 90</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-[#14141c] border border-[#262633] rounded-xl p-4">
              <MapPin className="text-cyan-400" />
              <div>
                <p className="text-xs text-gray-500">{t('location')}</p>
                <p className="text-gray-200 text-sm">Lot 39 E Parcelle 23/42, Dépôt Analakininina, Toamasina I, Atsinanana, Madagascar</p>
              </div>
            </div>

            <a
              href="https://github.com/mahazoasy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#14141c] border border-[#262633] rounded-xl p-4 card-hover"
            >
              <FaGithub className="text-cyan-400" size={20} />
              <div>
                <p className="text-xs text-gray-500">{t('github')}</p>
                <p className="text-gray-200 text-sm">github.com/mahazoasy</p>
              </div>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              name="name"
              type="text"
              required
              placeholder={t('name')}
              className="w-full bg-[#14141c] border border-[#262633] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={t('email')}
              className="w-full bg-[#14141c] border border-[#262633] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <textarea
              name="message"
              required
              rows={6}
              placeholder={t('message')}
              className="w-full bg-[#14141c] border border-[#262633] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full inline-flex items-center justify-center gap-2 bg-cyan-500 text-black font-semibold rounded-xl px-6 py-3 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> {t('sending')}
                </>
              ) : (
                <>
                  <Send size={18} /> {t('send')}
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle size={16} /> {t('success')}
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> {t('error')}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}