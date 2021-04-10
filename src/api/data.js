import * as api from './api.js';

const host = 'https://parseapi.back4app.com';
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;

function createPointer(name, id){
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    };
}

function addOwner(object){
    const userId = sessionStorage.getItem('userId');
    const result = Object.assign({}, object);
    result.owner = createPointer('_User', userId);
    return result;
}


export async function getIllustrations(){
    const response = await api.get(host+'/classes/Illustration');
    return response.results;
}

export async function getIllustrationById(id){
    return await api.get(host+'/classes/Illustration/'+id+'?include=owner');
}   
export async function createIllustration(illustration){
    const body = addOwner(illustration);
    return await api.post(host+'/classes/Illustration', body);
}

export async function editIllustration(illustration){
    return await api.put(host+'/classes/Illustration/'+id, illustration);
}

export async function deleteIllustration(id){
    return await api.del(host+'/classes/Illustration/'+id);
}

export async function createComment(illustrationId, comment){
    const body = addOwner(comment);
    body.illustration = createPointer('Illustration', illustrationId);
    return await api.post(host+'/classes/Comment', body);
}

export async function getCommentsByIllustrationId(illustrationId){
    const query = JSON.stringify({illustration: createPointer('Illustration', illustrationId)});
    const response = await api.get(host+'/classes/Comment?where='+encodeURIComponent(query));
    return response.results;
}

export async function editComment(id, comment){
    return await api.put(host+'/classes/Comment/'+id, comment);
}

export async function deleteComment(id){
    return await api.del(host+'/classes/Comment/'+id);
}