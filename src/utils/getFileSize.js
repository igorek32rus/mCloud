export const getFileSize = (bytes) => {
    if (!bytes) return 0 + ' Б'

    const nameSizes = ['Б', 'Кб', 'Мб', 'Гб', 'Тб']
    const size = []

    for (let i = 0; i < nameSizes.length; i++) {
        if (i === 0) {
            size.push(bytes)
            continue
        }

        const curSize = size[i - 1] / 1024
        
        if (Math.floor(curSize)) {
            size.push(curSize)
            continue
        }

        return size.pop().toFixed(2) + ' ' + nameSizes[i - 1]
    }

}