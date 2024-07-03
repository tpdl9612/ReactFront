import Article from "../../../types/interface/article.interface";
import ResponseDto from "../response.dto";


export default interface GetArticleResponseDto extends ResponseDto, Article{
    articles : Article[];
}