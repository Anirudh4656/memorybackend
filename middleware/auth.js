import jwt from "jsonwebtoken";
const auth = async(req,res,next)=>{
    try {
        console.log("first" +req)
        console.log("sec " +req.headers.authorization)
        const token = req.headers.authorization;
        console.log("tokn"+ token)
        const isCustomAuth = token.length <500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,"test");
            req.userId = decodedData?.id;

        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (e) {
        console.log(e);
    }
}
export default auth;