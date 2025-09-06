/**
 * HTML实体解码工具函数
 */

/**
 * 解码HTML实体
 * @param text - 包含HTML实体的文本
 * @returns 解码后的文本
 */
export function decodeHtmlEntities(text: string): string {
	if (typeof window === 'undefined') {
		return text
			.replace(/&#39;/g, '\'')
			.replace(/&#34;/g, '"')
			.replace(/&#38;/g, '&')
			.replace(/&#60;/g, '<')
			.replace(/&#62;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&apos;/g, '\'')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&amp;/g, '&')
	}
	else {
		const textarea = document.createElement('textarea')
		textarea.innerHTML = text
		return textarea.value
	}
}

/**
 * 移除HTML标签并解码HTML实体
 * @param html - HTML字符串
 * @returns 纯文本内容
 */
export function stripHtmlAndDecode(html: string): string {
	const stripped = html.replace(/<[^>]*>/g, '')
	return decodeHtmlEntities(stripped)
}
