
import { ResponseMessage } from "../../types/enums";


export default interface ResponseDto{
    // customerName: string;
    // customerPhone: string;
    // customerEmail: string;
    // customerAddress: string; /** 동+호 */
    // customerPostcode: string; /** 우편번호 **/
    message: ResponseMessage;
    success: boolean;
    status: string;
    code: string;
    data: any;
    
}