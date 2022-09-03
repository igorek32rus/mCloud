const MAIN = {
    SERVER: 'http://localhost:5000'
}

export const URLS = {
    AUTH: MAIN.SERVER + '/api/auth',
    LOGIN: MAIN.SERVER + '/api/auth/login',
    REGISTRATION: MAIN.SERVER + '/api/auth/registration',

    RESTORE_FILE: MAIN.SERVER + '/api/files/restore',
    GET_TREE_FOLDERS: MAIN.SERVER + '/api/files/tree',
    CREATE_FOLDER: MAIN.SERVER + '/api/files/dir/create',
    DELETE_FILES: MAIN.SERVER + '/api/files/delete',
    PERMANENT_DELETE_FILES: MAIN.SERVER + '/api/files/permanentDelete',
    RENAME_FILE: MAIN.SERVER + '/api/files/rename',
    UPLOAD_FILE: MAIN.SERVER + '/api/files/upload',

    GET_FILES: MAIN.SERVER + '/api/files',
    MOVE_FILES: MAIN.SERVER + '/api/files/move',
    SEARCH_FILES: MAIN.SERVER + '/api/files/search'
}