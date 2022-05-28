const getData = (dir, countFolders, countFiles) => {
    let data = []

    for (let i = 0; i < countFolders; i++) {
        data.push({
            id: dir +'_folder' + i,
            type: 'folder',
            name: 'Test' + i,
            parent: dir,
            date: new Date(),
            link: 'folder_hash',
            size: 252
        })
    }

    for (let i = 0; i < countFiles; i++) {
        data.push({
            id: dir + '_file' + i,
            type: 'file',
            name: `testFile${i}.txt`,
            parent: dir,
            date: new Date(),
            size: 252
        })
    }

    return data
}

export default getData