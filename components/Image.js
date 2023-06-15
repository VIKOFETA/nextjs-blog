import { useRef, useState } from 'react'
import styles from '../styles/Image.module.css'

function Image({image, className}) {
  const overlayRef = useRef();
  const [isClicked, setIsClicked] = useState();
  
  const onClick = () => {
    if(isClicked) return;
    setIsClicked(true);
    overlayRef.current.style.opacity = 1;
    navigator.clipboard.writeText(image.images.original.url)
    setTimeout(() => {
      setIsClicked(false);
      overlayRef.current.style.opacity = 0;
    }, 1000);
  }


  return (
    <div className={styles.image + ' ' + className} onClick={onClick}>
      <div className={styles.imageOverlay} ref={overlayRef}>        
        <p>URL copied to clipboard</p>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.imageInfo}>
          <p className={styles.imageTitle}> {image.title} </p>
        </div>
        <img 
          className={styles.imageInner}
          src={image.images.original.webp}
          alt={image.title}
          aspect-ratio="1"
        />
      </div>
    </div>
  )
}

export default Image