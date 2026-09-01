import { type CollectionEntry, getCollection } from "astro:content";
import { defaultLang, getPostLanguage, type Lang } from "@/i18n";

/** filter out draft posts based on the environment and optionally by language */
export async function getAllPosts(lang?: Lang) {
	return getCollection("post", (entry) => {
		const isNotDraft = import.meta.env.PROD ? !entry.data.draft : true;
		if (!isNotDraft) return false;
		if (!lang) return true;
		return getPostLanguage(entry) === lang;
	});
}

/** filter notes by language */
export async function getAllNotes(lang?: Lang) {
	return getCollection("note", (entry) => {
		if (!lang) return true;
		return getPostLanguage(entry) === lang;
	});
}

/** Get tag metadata by tag name with optional language fallback */
export async function getTagMeta(tag: string, lang?: Lang) {
	const allTags = await getCollection("tag");
	if (lang && lang !== defaultLang) {
		const localized = allTags.find((entry) => entry.id === `${lang}/${tag}`);
		if (localized) return localized;
	}
	return allTags.find((entry) => entry.id === tag);
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"post">[]) {
	return Object.groupBy(posts, (post) => post.data.publishDate.getFullYear().toString());
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts: CollectionEntry<"post">[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: CollectionEntry<"post">[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[]) {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
