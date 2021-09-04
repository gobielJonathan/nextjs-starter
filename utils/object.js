export const cloneDeepObject = (obj) => {
    const json = JSON.stringify(obj);
    return JSON.parse(json);
}