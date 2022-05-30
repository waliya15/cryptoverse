import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsApiHeaders={
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'dd0882a79dmsh85daa0be0f40ef3p1a0021jsnad35c37e64c2'
}
const baseUrl= 'https://bing-news-search1.p.rapidapi.com';

const createRequest = url => ({url, headers: newsApiHeaders})

export const newsApi= createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({newsCategory, count})=> 
            createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {useGetNewsQuery} = newsApi;