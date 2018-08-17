import {createSelector} from 'reselect'

const STORE_NAME = 'resource'

const resource = (state) => state[STORE_NAME]

const blog = createSelector(
  [resource],
  (resource) => resource.blog
)

const trustedUsers = createSelector(
  [blog],
  (blog) => blog.trustedUsers
)

const mode = createSelector(
  [blog],
  (blog) => blog.mode
)

const showEditCommentForm = createSelector(
  [blog],
  (blog) => blog.showEditCommentForm
)

const showCommentForm = createSelector(
  [blog],
  (blog) => blog.showCommentForm
)

const showComments = createSelector(
  [blog],
  (blog) => blog.showComments
)

const comments = createSelector(
  [blog],
  (blog) => blog.comments
)

const posts = createSelector(
  [blog],
  (blog) => blog.posts
)

const pdfenabled = createSelector(
  [blog],
  (blog) => blog.pdfenabled
)

const postEdit = createSelector(
  [blog],
  (blog) => blog.post_edit
)

const goHome = createSelector(
  [blog],
  (blog) => blog.goHome
)

const calendarSelectedDate = createSelector(
  [blog],
  (blog) => blog.calendarSelectedDate
)

const countTags = createSelector(
  [blog],
  (blog) => blog.data.tags.reduce((obj, tag) => {
    if (!obj[tag]) {
      obj[tag] = 0
    }
    obj[tag]++
    return obj
  }, {})
)

const displayTagsFrequency = createSelector(
  [blog],
  (blog) => {
    let obj = {}
    Object.keys(blog.data.tags).map(function (keyName) {
      let value = blog.data.tags[keyName]
      obj[keyName + '(' + value + ')'] = value
    })

    return obj
  }
)

export const select = {
  countTags,
  displayTagsFrequency,
  blog,
  mode,
  trustedUsers,
  showEditCommentForm,
  showCommentForm,
  showComments,
  comments,
  posts,
  pdfenabled,
  postEdit,
  goHome,
  calendarSelectedDate,
  STORE_NAME
}
