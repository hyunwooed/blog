import rss from "@astrojs/rss";
import { getAllNotes } from "@/data/post";
import { defaultLang, getEntryUrl } from "@/i18n";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const notes = await getAllNotes(defaultLang);

	return rss({
		title: `${siteConfig.title} (Notes)`,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: notes.map((note) => ({
			title: note.data.title,
			pubDate: note.data.publishDate,
			link: getEntryUrl(note, defaultLang).replace(/^\//, ""),
		})),
	});
};
