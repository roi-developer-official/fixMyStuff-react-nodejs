import { useRef, useState } from "react"

 export function AddImage({setInputValue}){
    const [dragOver,setDraggedOver] = useState(false);
    const imagePreviewRef = useRef();
    const inputRef = useRef();
    const [image,setImage] = useState(null);
    let showImage = true;

    function onDragOver(e){
        e.preventDefault();
        e.stopPropagation();
        setDraggedOver(true);
    }

    function onDragLeave(){
        setDraggedOver(false);
    }

    function onFileAdded(e){
        e.preventDefault();
        e.stopPropagation();

        let file;
        if(e.type === 'change')
            file = e.target.files[0];
        else 
            file = e.dataTransfer.files[0];
        
        if(!file.type.startsWith('image'))
            return;

        setImageInput(file)
    }

    function onFileDeleted(){
        setImage(null);
        setImageInput(null);
    }

    function setImageInput(file){
        if(!file){
            setImage(null);
            setInputValue(null);
        }
        else if(!file.type.startsWith('image/'))
            return;
        else {
            if(!image){
                setImage(file);
            }
            setInputValue(file);
            setImagePreview(file)
        }
    }

    function setImagePreview(file){
        let reader = new FileReader();
        reader.onload = (function(aImg){
            return function(e){
                aImg.src = e.target.result;
            }
        })(imagePreviewRef.current);
        reader.readAsDataURL(file);
    }


    return (
        <div>
        <div 
        className={`image_drop ${dragOver? 'dragOver' :'' }`}
        onDrop={onFileAdded} 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        >
        {image && <button onClick={onFileDeleted} className='delete_image'>&times;</button>}
            <p>Drop an image</p>
            {showImage && <img className={`image_preview ${ image? 'show' : ''}`} ref={imagePreviewRef}/>}
        </div>

    <div className="file_input_wrapper">
      {!image && <button 
        className='browse_btn' 
        onClick={()=>inputRef.current.click()}
        onDrop={onFileAdded} 
        onDragOver={onDragOver} 
        >Browse</button>}
            <input 
            style={{opacity:0}}
            ref={inputRef}
            onChange={onFileAdded}
            type='file'
            accept='image/*'
         ></input>
    </div>
    </div>
    )
}

