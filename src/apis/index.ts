import axios, { AxiosResponse} from 'axios';
import { ResponseBody } from '../types';
import { DeleteArticleResponseDto, GetAllArticleResponseDto, GetArticleResponseDto, PostArticleResponseDto } from "./response/article";
import { PostArticleRequestDto } from "./request/article";
import { ResponseDto } from './response';

// const responseHandler = <T>(response: AxiosResponse<any, any>) => {
//     const responseBody: T = response.data;
//     return responseBody;
// };

const DOMAIN = 'http://localhost:8088';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const GET_ALL_ARTICLE_URL = () => `${API_DOMAIN}/`;
const POST_ARTICLE_URL = () => `${API_DOMAIN}/article/write`;
const GET_ARTICLE_URL = (articleId: number | string | undefined) => `${API_DOMAIN}/article/detail/${articleId}`;
const DELETE_ARTICLE_URL = (articleId: number | string | undefined) => `${API_DOMAIN}/article/delete/${articleId}`;

export const getAllArticleRequest = async () => {
    const result = await axios.get(GET_ALL_ARTICLE_URL())
        .then(response => {
            const responseBody: GetAllArticleResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;

};

export const getArticleRequest = async (articleId: number | string | undefined) => {
    const result = await axios.get(GET_ARTICLE_URL(articleId))
        .then(response => {
            const responseBody: GetArticleResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response;
            return responseBody;
        });
    return result;
};

export const postArticleRequest = async (requestBody: PostArticleRequestDto) => {
    const result = await axios.post(POST_ARTICLE_URL(), requestBody)
        .then(response => {
            const responseBody: PostArticleResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}


export const deleteArticleRequest = async (articleId: number | string) => {
    const result = await axios.delete(DELETE_ARTICLE_URL(articleId))
        .then(response => {
            const responseBody: DeleteArticleResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.data;
            return responseBody;
        });
    return result;
};