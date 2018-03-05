import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID } from '../constants'

class CreatePost extends Component {

  state = {
    title: '',
    content: ''
  }

  render() {
    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            type='text'
            placeholder='A title for the post'
          />
          <textarea
            className='mb2'
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
            type='text'
            placeholder='The Content for the post'
          />
        </div>
        <button
          onClick={() => this._createPost()}
        >
          Submit
        </button>
      </div>
    )
  }

  _createPost = async () => {
    const postedById = localStorage.getItem(GC_USER_ID)
    if (!postedById) {
      console.error('No user logged in')
      return
    }
    const { title, content } = this.state
    await this.props.createPostMutation({
      variables: {
        title,
        content,
        postedById
      }
    })
    this.props.history.push(`/`)
  }
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $content: String!, $postedById: ID!) {
    createPost(
      title: $title,
      content: $content,
      postedById: $postedById
    ) {
      id
      createdAt
      title
      postedBy {
        id
      }
    }
  }
`


export default graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' })(CreatePost)
