import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeMinify from 'rehype-preset-minify'
import rehypeStringify from 'rehype-stringify'
import { toText } from 'hast-util-to-text'
// import rehypeExtractPosts from 'rehype-extract-posts'

export function sanitizeHtml(value) {
	return unified()
		.use(rehypeParse, { fragment: true })
		.use(rehypeSanitize, { strip: ['link', 'script', 'style'] })
		.use(rehypeMinify)
		.use(rehypeStringify)
		.processSync({ value })
}

/**
 * Gets a snippet from a string
 * @param {String} str - The string to get a snippet from
 * @returns {String} The snippet
 */
export function getSnippet(str) {
	const hast = unified().use(rehypeParse, { fragment: true }).parse(str)
	return toText(hast)
	// return decodeHTML(stripHtml(str)).trim()
}

// /**
//  * getPosts - Tries to get potential posts in the hast tree
//  */
// function extractPosts(html) {
// 	const pluginOptions = {}
// 	const tree = unified().use(rehypeParse, { fragment: true }).parse(html)
// 	const root = unified().use(rehypeExtractPosts, pluginOptions).runSync(tree)
// 	console.log(root)
// 	if ('children' in root) {
// 		return root.children
// 	}
// }