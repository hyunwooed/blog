import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getAllPosts } from "@/data/post";
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
	const posts = await getAllPosts(lang);
	const t = useTranslations(lang);
	const langLabel = t.label;

	return rss({
		title: `${siteConfig.title} (${langLabel})`,
		description: t.global.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: getEntryUrl(post, lang).replace(/^\//, ""),
		})),
	});
};
