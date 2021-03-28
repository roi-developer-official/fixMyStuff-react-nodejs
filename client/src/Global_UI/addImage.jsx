import { useRef, useState } from "react"

 export default function AddImage({setInputValue}){
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

    function onFileChange(e){
        e.preventDefault();
        e.stopPropagation();

        let file;
        if(e.type === 'change')
            file = e.target.files[0];
        else if(e.type === 'drop')
            file = e.dataTransfer.files[0];
        if(!file){
            return setImageInput(null); 
        }
        if(!file.type.startsWith('image/'))
            return;

        setImageInput(file)
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
        data-test="image-drop" 
        className={`image_drop ${dragOver? 'dragOver' :'' }`}
        onDrop={onFileChange} 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        >
        <button onClick={onFileChange} data-test="delete_image" className={`delete_image${image? ' show' : ''}`}>&times;</button>
            <p>Drop an image</p>
            {showImage && <img className={`image_preview ${ image? 'show' : ''}`} alt="signup" ref={imagePreviewRef}/>}
        </div>

    <div className="file_input_wrapper">
      {!image && <button 
        className='browse_btn' 
        onClick={()=>inputRef.current.click()}
        onDrop={onFileChange} 
        onDragOver={onDragOver} 
        >Browse</button>}
            <input 
            style={{opacity:0}}
            ref={inputRef}
            onChange={onFileChange}
            type='file'
            accept='image/*'
         ></input>
    </div>
    </div>
    )
}

