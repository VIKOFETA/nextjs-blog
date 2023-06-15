import styles from '../styles/ImagesGrid.module.css'
import Image from '../components/Image';

export default function ImagesGrid({ images }) {

  return (
    <div className={styles.imagesGrid}>
      {
        images.map( (image) => {
          return (
            <Image key={image.id} className={styles.imagesGridImage} image={image} />
          )
        })
      }
    </div>
  );
}