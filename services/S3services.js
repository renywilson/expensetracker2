const AWS=require('aws-sdk')

const  uploadToS3=(data,filename)=>{
    const BUCKET_NAME='exptrackerdownloadfile';
    const IAM_USER_KEY='AKIAZQH4X52SROT3XH5S';
    const IAM_USER_SECRET='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';
    
    
    
const s3bucket= new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    
    })
    
    
        const params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
    
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                console.log('something went wrong',err)
        reject(err)
            }
            else{
                console.log('success',s3response)
                 resolve(s3response.Location)
            }
          })
    })
    
    }
    module.exports={
        uploadToS3
    }