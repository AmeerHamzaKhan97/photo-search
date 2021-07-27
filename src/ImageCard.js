import React, { Fragment } from 'react'
 import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';


function parseSrc(image){
    // return  "https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
}
function ImageCard(props) {
  
    return (
        <Fragment>
        
            <li>
            <img  src={parseSrc(props.image_src)} alt={props.image_src}/>
            </li>
        </Fragment>
    )
}

export default ImageCard
