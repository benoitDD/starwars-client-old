import gql from 'graphql-tag'

function getValue(object, path){
    if(!object || (Array.isArray(object) && !object.length)){
        return undefined
    }
    if(!path || !path.length){
        return object
    }
    const index = path.indexOf('.')
    if(index === -1){
        return object[path]
    }
    const key = path.substring(0, index)
    return getValue(object[key], path.substring(index + 1, path.length))
}

function createQuery_get_all_object(nameQuery, nameObject, fragmentObject, nameFragmentObject){
    const GET_ALL_OBJECT = gql`
        query nameQuery($pageSize: Int, $after: String, $before: String){
            ${nameQuery}(pageSize: $pageSize, after: $after, before: $before){
                startCursor,
                endCursor,
                totalCount,
                ${nameObject} {
                    ...${nameFragmentObject}
                }
            }
        }
        ${fragmentObject}
    `
    return GET_ALL_OBJECT
}

function compose(...functions){
    return (...args) => {
        const res = functions.reverse().reduce((acc, f) => (f(acc)), ...args)
        return res
    }
}

export {getValue, createQuery_get_all_object, compose}