import React, { Component } from 'react'

class Post extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        <div>
          {this.props.post.content}
        </div>
      </div>
    )
  }

}

export default Post