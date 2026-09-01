import rss from "@astrojs/rss";
import { getAllPosts } from "@/data/post";
import { defaultLang, getEntryUrl } from "@/i18n";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const posts = await getAllPosts(defaultLang);

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: getEntryUrl(post, defaultLang).replace(/^\//, ""),
		})),
	});
};
