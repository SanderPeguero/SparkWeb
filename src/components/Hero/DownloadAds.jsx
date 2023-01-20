import React from 'react'
import Android from '../../assets/Google Play.png'
import Apple from '../../assets/App Store.png'

function DownloadAds() {
    const downloadImgStyle = 'border-[2px] border-[#232A4E] rounded-[13px] h-[3rem] w-[10rem]'
  return (
    <div className="download">
        <div className="download_images flex">
        <img
          src={Apple}
          alt=""
          className={downloadImgStyle + ` mr-[2rem]`}
        />
        <img
          src={Android}
          alt=""
          className={downloadImgStyle}
        /> 
        </div>
    </div>
    )
}

export default DownloadAds