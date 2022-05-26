const getData = (countFolders, countFiles) => {
    let data = []

    for (let i = 0; i < countFolders; i++) {
        data.push({
            id: 'folder' + i,
            type: 'folder',
            name: 'Test' + i,
            parent: 'root',
            date: new Date(),
            link: 'https://igorek.xyz',
            size: 252
        })
    }

    for (let i = 0; i < countFiles; i++) {
        data.push({
            id: 'file' + i,
            type: 'file',
            name: `testFile${i}.txt`,
            parent: 'root',
            date: new Date(),
            link: 'https://igorek.xyz',
            size: 252
        })
    }

    return data
}

export default getData