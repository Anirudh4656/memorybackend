import jwt from "jsonwebtoken";
const auth = async(req,res,next)=>{
    try {   
        // console.log("sec " +req.headers.authorization)
        //revise why i have used split;
        const token = req.headers.authorization.split(' ')[1];
        console.log("tokn" +" "+ token)
        const isCustomAuth = token.length <500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,"test");
            req.userId = decodedData?.id;
            console.log(`i am in  d ${decodedData?.id}`);
            console.log(req.userId);
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
            console.log(`i am in oauth ${decodedData} ${req.userId}`);
        }
        next();
    } catch (e) {
        console.log(`error is ${e}`);
    }
}
export default auth;