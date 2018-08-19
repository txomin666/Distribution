import {createSelector} from 'reselect'

const STORE_NAME = 'resource'

const resource = (state) => state[STORE_NAME]

const blog = createSelector(
  [resource],
  (resource) => resource.blog
)

const trustedUsers = createSelector(
  [resource],
  (blog) => blog.trustedUsers
)

const mode = createSelector(
  [resource],
  (blog) => blog.mode
)

const showEditCommentForm = createSelector(
  [resource],
  (blog) => blog.showEditCommentForm
)

const showCommentForm = createSelector(
  [resource],
  (blog) => blog.showCommentForm
)

const showComments = createSelector(
  [resource],
  (blog) => blog.showComments
)

const comments = createSelector(
  [resource],
  (blog) => blog.comments
)

const posts = createSelector(
  [resource],
  (blog) => {
    return blog.posts
  }
)

const pdfenabled = createSelector(
  [resource],
  (blog) => blog.pdfenabled
)

const postEdit = createSelector(
  [resource],
  (blog) => blog.post_edit
)

const post = createSelector(
  [resource],
  (blog) => blog.post
)

const goHome = createSelector(
  [resource],
  (blog) => blog.goHome
)

const calendarSelectedDate = createSelector(
  [resource],
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
  post,
  STORE_NAME
}
