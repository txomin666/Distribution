import {createSelector} from 'reselect'
import {size} from 'lodash/size'


const getArticles       = (state) => state.articles
const getTotalArticles  = (state) => state.totalArticles


const getSearchArticle  = createSelector(
  [getArticles],
  (articles) => size(articles)
)



export const select = {     
	getArticles, 
	getSearchArticle,
	getTotalArticles
}
       


console.log(select)