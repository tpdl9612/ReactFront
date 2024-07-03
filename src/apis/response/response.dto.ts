import { ResponseMessage } from "../../types/enums";
import Article from "../../types/interface/article.interface";


export default interface ResponseDto{
    // customerName: string;
    // customerPhone: string;
    // customerEmail: string;
    // customerAddress: string; /** 동+호 */
    // customerPostcode: string; /** 우편번호 **/
    articles: Article[];
    message: ResponseMessage;
    success: boolean;
    status: string;
    code: string;
    data: any;
    
}