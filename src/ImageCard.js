import React, { Fragment } from 'react'

import { useState } from 'react';


function parseSrc(image){
    // return  "https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
}
function ImageCard(props) {
  const [isOpen,setIsOpen] = useState(false)
  const [model, setModel] = useState(true)
 
  function showImg(){
      setIsOpen(!isOpen)
      setModel(!model)
      console.log("clicked")
      
      
  }

   let a = model ? "normal" : "click";

    // return (
    //   <Fragment>
    //     <li>
    //       <img
    //         onClick={showImg}
    //         // className={a
    //         src={parseSrc(props.image_src)}
    //         alt={props.image_src}
    //       />
    //       {isOpen && (
    //         <dialog
    //           className={a}
    //           style={{ position: "fixed" }}
    //           open
    //           onClick={showImg}
    //         >
    //           <img
    //             onClick={showImg}
    //            className={a}
    //             src={parseSrc(props.image_src)}
    //             alt={props.image_src}
    //           />
    //         </dialog>
    //       )}
    //     </li>
    //   </Fragment>
    // );
    return (
      
        <li>
          <img
            className="small"
            src={parseSrc(props.image_src)}
            onClick={showImg}
            alt={props.image_src}
          />
          {isOpen && (
            <dialog
              className="dialog"
              style={{ position: "fixed" }}
              open
              onClick={showImg}
            >
              <img
                className="image"
                src={parseSrc(props.image_src)}
                onClick={showImg}
                alt={props.image_src}
              />
            </dialog>
          )}
        </li>
      
    );
}

export default ImageCard
