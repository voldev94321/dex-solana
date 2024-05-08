import axios from "axios";

export const getTokenList = ( callback: any ) => {
    axios.get("" + process.env.NEXT_PUBLIC_TOKEN_LIST_API_URL).then(result => {
        callback(result.data.tokens);
    }).catch(error=>{
        console.log(error);
    })
}