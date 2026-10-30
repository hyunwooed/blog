import rss from "@astrojs/rss";
import { getAllNotes } from "@/data/post";
import { defaultLang, getEntryUrl, useTranslations } from "@/i18n";
import { siteConfig } from "@/site.config";
import { collectionDateSort } from "@/utils/date";

export const GET = async () => {
	const notes = (await getAllNotes(defaultLang)).sort(collectionDateSort);
	const t = useTranslations(defaultLang);

	return rss({
		title: `${siteConfig.title} (${t.notes.title})`,
		description: t.notes.description,
		site: import.meta.env.SITE,
		items: notes.map((note) => ({
			title: note.data.title,
			description: note.data.description,
			pubDate: note.data.publishDate,
			link: getEntryUrl(note, defaultLang).replace(/^\//, ""),
		})),
	});
};
