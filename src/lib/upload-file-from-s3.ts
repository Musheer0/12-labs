export const uploadFileFromS3 = async(url:string,fields:Object, file:File)=>{
    const form = new FormData();
    Object.entries(fields).forEach(([k,v])=>{
        form.append(k,v)
    });
    form.append("file",file);
    await fetch(url,{
        method:"POST",
        body:form
    })
}