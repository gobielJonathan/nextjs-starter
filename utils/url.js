export const slug = text => {
    if (!text) return ''
    return text?.toLowerCase()?.replace(/[^\w\d\s]/gi, '').replace(/\s{2,}/g, ' ').replace(/\s/g, '-')
}