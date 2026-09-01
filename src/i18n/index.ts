import { en, type LanguageInfo } from "./en";
import { ko } from "./ko";

export type { LanguageInfo };

export const supportedLanguages: Record<string, LanguageInfo> = {
	en,
	ko,
};

export const defaultLang: Lang = "en";

export type Lang = keyof typeof supportedLanguages;

export const languages = Object.fromEntries(
	Object.entries(supportedLanguages).map(([code, info]) => [code, info.label]),
) as Record<Lang, string>;

export const languageCodes = Object.keys(supportedLanguages) as [Lang, ...Lang[]];

/**
 * Get language from URL, pathname, or object
 */
export function getLangFromUrl(url: URL | string | undefined): Lang {
	if (!url) return defaultLang;
	const pathname = typeof url === "string" ? url : url.pathname;
	const segments = pathname.split("/").filter(Boolean);
	if (segments.length > 0 && segments[0] in supportedLanguages) {
		return segments[0] as Lang;
	}
	return defaultLang;
}

/**
 * Resolve language metadata and translations for a given language code, URL, or pathname
 */
export function useTranslations(target?: URL | string | Lang): LanguageInfo {
	const lang =
		typeof target === "string" && target in supportedLanguages
			? (target as Lang)
			: getLangFromUrl(target);
	return supportedLanguages[lang] ?? supportedLanguages[defaultLang];
}

/**
 * Get language for a post or note based on frontmatter or id path
 */
export function getPostLanguage(entry: { id: string; data?: { lang?: string } }): Lang {
	if (entry.data?.lang && entry.data.lang in supportedLanguages) {
		return entry.data.lang as Lang;
	}
	const firstSegment = entry.id.split("/")[0];
	if (firstSegment && firstSegment in supportedLanguages) {
		return firstSegment as Lang;
	}
	return defaultLang;
}

/**
 * Remove language prefix from a slug/id (e.g., 'ko/my-post' -> 'my-post')
 */
export function getCleanSlug(id: string): string {
	const segments = id.split("/");
	if (segments.length > 1 && segments[0] in supportedLanguages) {
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
	if (currentLang === targetLang) {
		return pathname;
	}

	// Normalize pathname by stripping current language prefix if non-default
	let cleanPath = pathname;
	if (currentLang !== defaultLang) {
		if (cleanPath.startsWith(`/${currentLang}/`)) {
			cleanPath = cleanPath.slice(currentLang.length + 1);
		} else if (cleanPath === `/${currentLang}` || cleanPath === `/${currentLang}/`) {
			cleanPath = "/";
		}
	}

	const [section] = cleanPath.split("/").filter(Boolean);
	const targetPrefix = targetLang === defaultLang ? "" : `/${targetLang}`;

	return section ? `${targetPrefix}/${section}/` : `${targetPrefix}/`;
}

/**
 * Get localized menu links for header and footer
 */
export function getMenuLinks(lang: Lang = defaultLang) {
	const dict = useTranslations(lang);
	const prefix = lang === defaultLang ? "" : `/${lang}`;

	return [
		{ path: `${prefix}/`, title: dict.nav.home },
		{ path: `${prefix}/about/`, title: dict.nav.about },
		{ path: `${prefix}/posts/`, title: dict.nav.blog },
		{ path: `${prefix}/notes/`, title: dict.nav.notes },
	];
}
