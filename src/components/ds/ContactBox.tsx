// The contact box (design-system/komponenter/ContactBox.md): a human to talk
// to. A portrait (the CMS image about.images.founder, with the bundled
// public/branding/founder-mugshot.png as the fallback), the phone number and
// the mail as links in sage, and one full-width primary button. `children`
// stands above the card on the right (the homepage puts the Quote there).
import * as React from "react";
import { Photo } from "./Photo";
import { Button } from "./Button";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { getSelfServe } from "@/lib/selfServe";
import { resolveCta } from "@/lib/packageView";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/content/cta";

const FALLBACK_PORTRAIT = "/branding/founder-mugshot.png";

/** `text` with the first `needle` turned into a link: the number and the address stay one source of truth (cta.ts). */
function linkify(text: string, needle: string, href: string): React.ReactNode {
  const i = text.indexOf(needle);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <a href={href} className="font-semibold text-sage underline underline-offset-4">
        {needle}
      </a>
      {text.slice(i + needle.length)}
    </>
  );
}

export interface ContactBoxCopy {
  title: string;
  body: string;
  personName: string;
  personRole: string;
  phoneLine: string;
  emailLine: string;
  cta: { label: string; href: string };
}

export async function ContactBox({ contact, children }: { contact: ContactBoxCopy; children?: React.ReactNode }) {
  const [images, selfServe] = await Promise.all([fetchMarketingCopy("about.images", "da"), getSelfServe()]);
  const portrait = cmsImageUrl(images, "founder") ?? FALLBACK_PORTRAIT;
  const cta = resolveCta(contact.cta, selfServe);
  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
      <figure className="m-0 grid content-start gap-3">
        <Photo src={portrait} alt={`${contact.personName}, ${contact.personRole}`} ratio="portrait" className="max-lg:max-w-sm" sizes="(min-width: 1024px) 480px, 100vw" />
        <figcaption className="text-body-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{contact.personName}</span>
          {contact.personRole && `, ${contact.personRole}`}
        </figcaption>
      </figure>
      <div className="flex flex-col gap-6">
        {children}
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-soft md:p-8" data-testid="contact-box">
          <h3 className="mb-1">{contact.title}</h3>
          {contact.body && <p className="max-w-(--measure-body) text-foreground">{contact.body}</p>}
          <p>{linkify(contact.phoneLine, PHONE_DISPLAY, PHONE_HREF)}</p>
          <p>{linkify(contact.emailLine, CONTACT_EMAIL, CONTACT_EMAIL_HREF)}</p>
          <Button href={cta.href} variant="primary" full className="mt-3">
            {cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
