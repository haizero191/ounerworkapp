import React from 'react'
import "./MiniProfile.scss"

const MiniProfile = () => {
  return (
    <div className='MiniProfile'>
        <div className='mini-profile_info'>
            <div className='avatar'>
                <img src='https://productplacementblog.com/wp-content/uploads/2019/11/Apple-MacBook-Laptop-Used-by-Thomas-Middleditch-as-Richard-Hendricks-in-Silicon-Valley-Season-6-Episode-4-4.jpg'/>
            </div>
            <div className='info'>
                <p>User name</p>
                <p>Infomation Technologies</p>
            </div>
        </div>
        <div className='mini-profile_logout'>Logout</div>
    </div>
  )
}

export default MiniProfile