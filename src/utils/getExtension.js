export const getExtension = (fileName) => {
    const ext = fileName.split('.').pop()
    if (ext.length > 5 || ext.length === 0) {
        return ''
    }
    return ext
}