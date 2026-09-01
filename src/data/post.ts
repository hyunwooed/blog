import { type CollectionEntry, getCollection } from "astro:content";
import { getPostLanguage, type Lang } from "@/i18n";

/** filter out draft posts based on the environment and optionally by language */
export async function getAllPosts(lang?: Lang): Promise<CollectionEntry<"post">[]> {
	return await getCollection("post", ({ data, id }) => {
		const isNotDraft = import.meta.env.PROD ? !data.draft : true;
		if (!isNotDraft) return false;
		if (!lang) return true;
		return getPostLanguage({ data, id }) === lang;
	});
}

/** filter notes by language */
export async function getAllNotes(lang?: Lang): Promise<CollectionEntry<"note">[]> {
	return await getCollection("note", ({ data, id }) => {
		if (!lang) return true;
		return getPostLanguage({ data, id }) === lang;
	});
}

/** Get tag metadata by tag name */
export async function getTagMeta(tag: string): Promise<CollectionEntry<"tag"> | undefined> {
	const tagEntries = await getCollection("tag", (entry) => {
		return entry.id === tag;
	});
	return tagEntries[0];
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
export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
