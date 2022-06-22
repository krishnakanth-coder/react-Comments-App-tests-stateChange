import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {userCommentList: [], userName: '', userComment: ''}

  submitComment = event => {
    event.preventDefault()
    const {userName, userComment} = this.state
    const newComment = {
      id: uuidv4(),
      userName,
      userComment,
      isLike: false,
      date: new Date(),
    }
    this.setState(prev => ({
      userCommentList: [...prev.userCommentList, newComment],
      userName: '',
      userComment: '',
    }))
    console.log(newComment.id)
  }

  onChangeUserComment = event => {
    this.setState({userComment: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  likeCommentBtn = id => {
    this.setState(prev => ({
      userCommentList: prev.userCommentList.map(each => {
        if (id === each.id) {
          console.log({...each, isLike: !each.isLike})
          return {...each, isLike: !each.isLike}
        }
        console.log(each)
        return each
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prev => ({
      userCommentList: prev.userCommentList.filter(each => {
        if (each.id === id) {
          return ''
        }
        return each
      }),
    }))
  }

  render() {
    const {userCommentList, userName, userComment} = this.state
    const noOfComments = userCommentList.length
    const logoColor =
      noOfComments <= initialContainerBackgroundClassNames.length
        ? initialContainerBackgroundClassNames[noOfComments]
        : initialContainerBackgroundClassNames[
            noOfComments % initialContainerBackgroundClassNames
          ]
    return (
      <div className="comment-page-container">
        <div className="user-comment-container">
          <div className="user-comment-card">
            <h1>Comments</h1>
            <p>Say something about 4.0 Technologies</p>
            <form className="form-control" onSubmit={this.submitComment}>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={this.onChangeUserName}
              />
              <br />
              <textarea
                rows={5}
                cols={20}
                className=""
                placeholder="Your Comment"
                value={userComment}
                onChange={this.onChangeUserComment}
              />
              <br />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="user-comment-card-image"
          />
        </div>
        <div className="count-comments">
          <p className="total-comments">{noOfComments}</p>
          <p>Comments</p>
        </div>
        <ul className="all-users-container">
          {userCommentList.map(eachComment => (
            <CommentItem
              eachComment={eachComment}
              key={eachComment.id}
              likeCommentBtn={this.likeCommentBtn}
              deleteComment={this.deleteComment}
              logoColor={logoColor}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
