import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './index.css'

const CommentItem = props => {
  const {eachComment, likeCommentBtn, deleteComment, logoColor} = props
  const {id, userName, userComment, isLike, date} = eachComment
  const userNameIcon = userName.slice(0, 1).toUpperCase()
  const onClickLike = () => {
    likeCommentBtn(id)
  }
  const onDeleteComment = () => {
    deleteComment(id)
  }
  const likeSrc =
    isLike === true
      ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const createdDate = formatDistanceToNow(new Date(), {includeSeconds: true})
  return (
    <li className="comment-list-container">
      <div className="comment-user-details">
        <h1 className={`user-icon ${logoColor}`}>{userNameIcon}</h1>
        <div>
          <div className="header-timer">
            <h1 className="user-name">{userName}</h1>
            <span className="time-text">{createdDate}</span>
          </div>

          <p className="user-comment"> {userComment}</p>
        </div>
      </div>
      <div className="user-reactions-container">
        <div>
          <img src={likeSrc} alt="like " className="image-icon" />
          <button type="button" className="buttons" onClick={onClickLike}>
            {' '}
            Like
          </button>
        </div>
        <button
          type="button"
          className="buttons"
          testid="delete"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
            className="image-icon"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
