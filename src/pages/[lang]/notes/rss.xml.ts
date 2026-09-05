import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getAllNotes } from "@/data/post";
import {
	defaultLang,
	getEntryUrl,
	isSupportedLang,
	nonDefaultLangs,
	useTranslations,
} from "@/i18n";
import { siteConfig } from "@/site.config";

export const getStaticPaths = (() => {
	return nonDefaultLangs.map((lang) => ({
		params: { lang },
	}));
}) satisfies import("astro").GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
	const lang = isSupportedLang(params.lang) ? params.lang : defaultLang;
	const notes = await getAllNotes(lang);
	const t = useTranslations(lang);
	const langLabel = t.label;

	return rss({
		title: `${siteConfig.title} (${langLabel} Notes)`,
		description: t.notes.description,
		site: import.meta.env.SITE,
		items: notes.map((note) => ({
			title: note.data.title,
			description: note.data.description,
			pubDate: note.data.publishDate,
			link: getEntryUrl(note, lang).replace(/^\//, ""),
		})),
	});
};
