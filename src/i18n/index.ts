import type { CollectionEntry } from "astro:content";
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
 * Check if a value is a supported language
 */
export const isSupportedLang = (lang: unknown): lang is Lang =>
	typeof lang === "string" && lang in languages;

/**
 * Get language from URL or pathname, following Astro's official i18n recipe
 */
export function getLangFromUrl(url?: URL | string) {
	if (!url) return defaultLang;
	const pathname = typeof url === "string" ? url : url.pathname;
	const [, lang] = pathname.split("/");
	if (isSupportedLang(lang)) return lang;
	return defaultLang;
}

/**
 * Resolve language metadata and translations for a given language code, URL, or pathname
 */
export function useTranslations(target?: URL | string | Lang) {
	const lang = isSupportedLang(target) ? target : getLangFromUrl(target);
	return languages[lang] ?? languages[defaultLang];
}

/**
 * Get language for a content entry based on frontmatter or id path
 */
export function getPostLanguage(entry: CollectionEntry<"post" | "note">) {
	if (isSupportedLang(entry.data.lang)) {
		return entry.data.lang;
	}
	const firstSegment = entry.id.split("/")[0];
	return isSupportedLang(firstSegment) ? firstSegment : defaultLang;
}

/**
 * Remove language prefix from a slug/id (e.g., 'ko/my-post' -> 'my-post')
 */
export function getCleanSlug(id: string) {
	const segments = id.split("/");
	if (segments.length > 1 && isSupportedLang(segments[0])) {
		return segments.slice(1).join("/");
	}
	return id;
}

/**
 * Unified helper to get a localized URL for any path
 */
export function getLocalizedUrl(path = "", lang: Lang = defaultLang) {
	const clean = path.replace(/^\/|\/$/g, "");
	const prefix = lang === defaultLang ? "" : `/${lang}`;
	if (!clean) return `${prefix}/`;

	// If it's a file with an extension (e.g., rss.xml), don't add trailing slash
	return clean.includes(".") ? `${prefix}/${clean}` : `${prefix}/${clean}/`;
}

/**
 * Unified helper to get URL for any post or note content entry
 */
export function getEntryUrl(entry: CollectionEntry<"post" | "note">, lang?: Lang) {
	const entryLang = lang ?? getPostLanguage(entry);
	const collection = `${entry.collection}s`;
	const slug = getCleanSlug(entry.id);
	return getLocalizedUrl(`${collection}/${slug}`, entryLang);
}

/**
 * Generate localized path for switching languages via LanguageToggle
 */
export function getLocalizedPath(pathname: string, targetLang: Lang) {
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
