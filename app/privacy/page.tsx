import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { policySections, policyUpdatedAt } from "@/data/privacyPolicy";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Политика в отношении обработки персональных данных прихода храма Благовещения Пресвятой Богородицы в Сокольниках в соответствии с 152-ФЗ.",
  alternates: { canonical: "/privacy" },
};

const URL_EMAIL_PATTERN = /(https?:\/\/[^\s,)]+|[\w.-]+@[\w.-]+\.\w+)/g;

function renderWithLinks(text: string) {
  const parts = text.split(URL_EMAIL_PATTERN);
  return parts.map((part, i) => {
    if (!URL_EMAIL_PATTERN.test(part)) {
      URL_EMAIL_PATTERN.lastIndex = 0;
      return <Fragment key={i}>{part}</Fragment>;
    }
    URL_EMAIL_PATTERN.lastIndex = 0;
    const isEmail = part.includes("@") && !part.startsWith("http");
    return (
      <a
        key={i}
        href={isEmail ? `mailto:${part}` : part}
        className="text-primary underline underline-offset-2 hover:text-gold-dark"
      >
        {part}
      </a>
    );
  });
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header transparent={false} />
      <main className="bg-background pb-20 pt-28 sm:pt-32">
        <div className="container-site max-w-3xl">
          <header className="mb-10 border-b border-border pb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              Правовая информация
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-primary sm:text-4xl">
              Политика в отношении обработки персональных данных
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
              Составлена в соответствии с требованиями Федерального закона от
              27.07.2006 № 152-ФЗ «О персональных данных». Полное наименование
              оператора персональных данных приведено в разделе 1 ниже.
            </p>
            <p className="mt-3 text-xs text-charcoal/50">
              Актуальная редакция: {policyUpdatedAt}
            </p>
          </header>

          <article className="space-y-10">
            {policySections.map((section) => {
              const sectionId = `section-${section.heading.split(".")[0]}`;
              return (
              <section key={section.heading} aria-labelledby={sectionId}>
                <h2
                  id={sectionId}
                  className="font-display text-xl font-semibold text-primary sm:text-2xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.blocks.map((block, i) => {
                    if (block.type === "paragraph") {
                      return (
                        <p key={i} className="text-sm leading-relaxed text-charcoal sm:text-base">
                          {renderWithLinks(block.text)}
                        </p>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={i} className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-charcoal sm:text-base">
                          {block.items.map((item, j) => (
                            <li key={j}>{renderWithLinks(item)}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className="overflow-hidden rounded-2xl border border-border"
                      >
                        <dl className="divide-y divide-border">
                          {block.rows.map((row) => (
                            <div
                              key={row.label}
                              className="grid gap-1 bg-white p-4 sm:grid-cols-[220px_1fr] sm:gap-4"
                            >
                              <dt className="text-sm font-semibold text-primary">
                                {row.label}
                              </dt>
                              <dd className="text-sm text-charcoal">
                                {Array.isArray(row.value) ? (
                                  <ul className="list-disc space-y-1 pl-5">
                                    {row.value.map((v, k) => (
                                      <li key={k}>{v}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  row.value
                                )}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    );
                  })}
                </div>
              </section>
              );
            })}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
