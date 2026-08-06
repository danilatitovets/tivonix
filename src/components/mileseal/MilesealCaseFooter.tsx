import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LangProvider";
import { milesealCaseCopy } from "../../i18n/milesealCaseCopy";
import { pathForLang } from "../../lib/localePaths";

const PRIVACY_HREF: Record<"en" | "ru" | "zh", string> = {
  en: "/doc/Privacy_Policy_Tivonix_EN.pdf",
  ru: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
  zh: "/doc/Privacy_Policy_Tivonix_EN.pdf",
};

/** Compact footer for MileSeal case/demo pages only — does not replace site Footer. */
export default function MilesealCaseFooter() {
  const { lang } = useLang();
  const copy = milesealCaseCopy(lang).footer;

  return (
    <footer
      id="site-footer"
      className="border-t border-white/[0.08] bg-[#0a0a0a]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10">
        <nav
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-white/55"
          aria-label="MileSeal"
        >
          <Link
            to={pathForLang("/", lang)}
            className="text-white/80 transition hover:text-white"
          >
            TIVONIX
          </Link>
          <span className="text-white/20" aria-hidden>
            ·
          </span>
          <Link
            to={pathForLang("/mileseal", lang)}
            className="transition hover:text-white"
          >
            MileSeal
          </Link>
          <span className="text-white/20" aria-hidden>
            ·
          </span>
          <a
            href={PRIVACY_HREF[lang] ?? PRIVACY_HREF.en}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            {copy.privacy}
          </a>
          <span className="text-white/20" aria-hidden>
            ·
          </span>
          <Link
            to={pathForLang("/contacts", lang)}
            className="transition hover:text-white"
          >
            {copy.contact}
          </Link>
        </nav>
        <p className="text-[12px] font-medium text-white/40">{copy.copyright}</p>
      </div>
    </footer>
  );
}
