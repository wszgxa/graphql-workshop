import React, { Component } from 'react'
import Post from './Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PostsList extends Component {
  render() {
    if (this.props.getPosts && this.props.getPosts.loading) {
      return <div>Loading</div>
    }

    if (this.props.getPosts && this.props.getPosts.error) {
      return <div>Error</div>
    }

    const posts = this.props.getPosts.allPosts
    return (
      <div>{posts.map(post => <Post key={post.id} post={post} />)}</div>
    )
  }
}

const GET_POSTS = gql`
  query {
    allPosts {
      id
      title
      content
    }
  }
`

export default graphql(GET_POSTS, { name: 'getPosts' }) (PostsList)