import mime from 'mime-types'

export function mimeAccept(mimetype){
    const extension = mime.extension(mimetype)
    return ['png', 'jpeg', 'jpg'].includes(extension) ? [true, extension] : [false, extension]
}