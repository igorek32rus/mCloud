const MAIN = {
    SERVER: 'http://localhost:5000',
    SITE: 'http://localhost:3000'
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
    COPY_FILES: MAIN.SERVER + '/api/files/copy',
    SEARCH_FILES: MAIN.SERVER + '/api/files/search',
    TOGGLE_SHARE: MAIN.SERVER + '/api/files/share',
    SHARE_INFO: MAIN.SERVER + '/api/files/shareInfo',
    GET_SHARE_FILE: MAIN.SERVER + '/api/files/getShare',
    
    DOWNLOAD_FILES: MAIN.SERVER + '/api/files/download',

    SHARE: MAIN.SITE + '/share'
}