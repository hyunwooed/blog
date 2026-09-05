import { en, type LanguageInfo } from "./en";
import { ko } from "./ko";

export type { LanguageInfo };

export const defaultLang = "en" as const;

export const languages = {
	en,
	ko,
};

export type Lang = keyof typeof languages;

export const languageCodes = Object.keys(languages) as [Lang, ...Lang[]];

export const nonDefaultLangs = languageCodes.filter((lang) => lang !== defaultLang);

/**
 * Type guard to check if a value is a supported language code
 */
export function isSupportedLang(lang: unknown): lang is Lang {
	return typeof lang === "string" && lang in languages;
}

/**
 * Get language from URL, pathname, or object
 */
export function getLangFromUrl(url: URL | string | undefined): Lang {
	if (!url) return defaultLang;
	const pathname = typeof url === "string" ? url : url.pathname;
	const firstSegment = pathname.split("/").filter(Boolean)[0];
	return isSupportedLang(firstSegment) ? firstSegment : defaultLang;
}

/**
 * Resolve language metadata and translations for a given language code, URL, or pathname
 */
export function useTranslations(target?: URL | string | Lang): LanguageInfo {
	const lang = isSupportedLang(target) ? target : getLangFromUrl(target);
	return languages[lang] ?? languages[defaultLang];
}

/**
 * Get language for a post or note based on frontmatter or id path
 */
export function getPostLanguage(entry: { id: string; data?: { lang?: string } }): Lang {
	if (isSupportedLang(entry.data?.lang)) {
		return entry.data.lang;
	}
	const firstSegment = entry.id.split("/")[0];
	return isSupportedLang(firstSegment) ? firstSegment : defaultLang;
}

/**
 * Remove language prefix from a slug/id (e.g., 'ko/my-post' -> 'my-post')
 */
export function getCleanSlug(id: string): string {
	const segments = id.split("/");
	if (segments.length > 1 && isSupportedLang(segments[0])) {
		return segments.slice(1).join("/");
	}
	return id;
}

/**
 * Unified helper to get a localized URL for any path
 */
export function getLocalizedUrl(path = "", lang: Lang = defaultLang): string {
	const clean = path.replace(/^\/|\/$/g, "");
	const prefix = lang === defaultLang ? "" : `/${lang}`;
	if (!clean) return `${prefix}/`;

	// If it's a file with an extension (e.g., rss.xml), don't add trailing slash
	return clean.includes(".") ? `${prefix}/${clean}` : `${prefix}/${clean}/`;
}

/**
 * Unified helper to get URL for any post or note content entry
 */
export function getEntryUrl(
	entry: { id: string; data?: { lang?: string }; collection?: string },
	lang?: Lang,
): string {
	const entryLang = lang ?? getPostLanguage(entry);
	const collection = entry.collection === "note" ? "notes" : "posts";
	const slug = getCleanSlug(entry.id);
	return getLocalizedUrl(`${collection}/${slug}`, entryLang);
}

/**
 * Generate localized path for switching languages via LanguageToggle
 */
export function getLocalizedPath(pathname: string, targetLang: Lang): string {
	const currentLang = getLangFromUrl(pathname);
	if (currentLang === targetLang) return pathname;

	const segments = pathname.split("/").filter(Boolean);
	if (segments[0] === currentLang) {
		segments.shift();
	}
	const section = segments[0] ?? "";
	return getLocalizedUrl(section, targetLang);
}

/**
 * Get localized menu links for header and footer
 */
export function getMenuLinks(lang: Lang = defaultLang) {
	const dict = useTranslations(lang);
	return [
		{ path: getLocalizedUrl("", lang), title: dict.nav.home },
		{ path: getLocalizedUrl("about", lang), title: dict.nav.about },
		{ path: getLocalizedUrl("posts", lang), title: dict.nav.blog },
		{ path: getLocalizedUrl("notes", lang), title: dict.nav.notes },
	];
}
