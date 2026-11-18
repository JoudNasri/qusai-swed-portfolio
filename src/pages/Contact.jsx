import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Page from '../components/Page.jsx';
import { SplitText, FadeUp } from '../components/Reveal.jsx';
import { site, img } from '../data/site.js';
import { easeOut } from '../lib/smoothScroll.js';

const types = ['Boutique Design', 'Fit-Out', 'Site Safety', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: types[0], message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject: ${form.type}\n\n${form.message}`;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`New project — ${form.type}`)}&body=${encodeURIComponent(body)}`;
  const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`;

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    window.location.href = mailto;
  };

  return (
    <Page title="Contact" footerCta={false}>
      <section className="contact">
        <div className="contact__media">
          <motion.img
            src={img('silk')}
            alt=""
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease: easeOut }}
          />
          <div className="contact__media-shade" />
          <div className="contact__intro">
            <p className="eyebrow"><span className="line" /> Contact</p>
            <h1 className="h-giant">
              <SplitText text="Let’s" />
              <SplitText text="talk" className="gold-text italic" delay={0.12} />
            </h1>
            <FadeUp delay={0.4} as="p" className="contact__lead">
              Tell me about the boutique you’re planning — the brand, the location and the timeline.
            </FadeUp>
            <FadeUp delay={0.55} className="contact__info">
              <a href={`mailto:${site.email}`}><span>Email</span>{site.email}</a>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}><span>Phone</span>{site.phone}</a>
              <a href={whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span>Message directly</a>
              <p><span>Based in</span>{site.location}</p>
            </FadeUp>
          </div>
        </div>

        <div className="contact__form-wrap">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                className="contact__form"
                onSubmit={submit}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <FadeUp className="eyebrow eyebrow--dark"><span className="line" /> Project enquiry</FadeUp>

                <FadeUp delay={0.1} className="field">
                  <input id="name" required value={form.name} onChange={set('name')} placeholder=" " />
                  <label htmlFor="name">Your name</label>
                </FadeUp>
                <div className="field-row">
                  <FadeUp delay={0.15} className="field">
                    <input id="email" type="email" required value={form.email} onChange={set('email')} placeholder=" " />
                    <label htmlFor="email">Email</label>
                  </FadeUp>
                  <FadeUp delay={0.2} className="field">
                    <input id="phone" value={form.phone} onChange={set('phone')} placeholder=" " />
                    <label htmlFor="phone">Phone</label>
                  </FadeUp>
                </div>

                <FadeUp delay={0.25} className="chips">
                  <span className="chips__label">I need help with</span>
                  <div>
                    {types.map((t) => (
                      <button
                        type="button"
                        key={t}
                        className={`chip ${form.type === t ? 'is-active' : ''}`}
                        onClick={() => setForm((f) => ({ ...f, type: t }))}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </FadeUp>

                <FadeUp delay={0.3} className="field">
                  <textarea id="msg" rows="4" required value={form.message} onChange={set('message')} placeholder=" " />
                  <label htmlFor="msg">Tell me about the project</label>
                </FadeUp>

                <FadeUp delay={0.35} className="contact__actions">
                  <button type="submit" className="btn btn--blood"><span>Send by Email</span></button>
                  <a href={whatsapp} target="_blank" rel="noreferrer" className="btn btn--ghost-dark"><span>Send on WhatsApp</span></a>
                </FadeUp>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                className="contact__sent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut }}
              >
                <span className="contact__sent-mark gold-text">◆</span>
                <h2 className="h-display h-display--dark">Your email is ready</h2>
                <p>
                  Your email app should have opened with the message filled in — just press send.
                  If it didn’t, write directly to <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
                <button className="btn btn--ghost-dark" onClick={() => setSent(false)}><span>Back to the form</span></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Page>
  );
}
