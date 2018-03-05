import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
class Header extends Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div className='flex pa1 justify-between nowrap olive'>
        <div className='flex flex-fixed black'>
          <Link to='/' className='fw7 mr1 unlink'>诗歌天下</Link>
          <Link to='/create' className='ml1 no-underline black'>new</Link>
        </div>
        <div className='flex flex-fixed'>
          {userId ?
            <div className='ml1 pointer black' onClick={() => {
              localStorage.removeItem(GC_USER_ID)
              localStorage.removeItem(GC_AUTH_TOKEN)
              this.props.history.push(`/`)
            }}>logout</div>
            :
            <Link to='/login' className='ml1 no-underline black'>login</Link>
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Header)