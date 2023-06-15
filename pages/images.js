import {useState, useRef, useEffect } from 'react'
import Layout from '../components/layout';
import ImagesGrid from '../components/imagesGrid';
import styles from '../styles/ImagesPage.module.css'
import Search from '../components/Search';

import { useSelector } from 'react-redux';

const apiKey = '8THsQtNfqLgBTaJNpzM73sBh3SM31IMx';

function Images({ imagesData }) {
  const [images, setImages] = useState(imagesData.data)
  const [imagesLimit, setImagesLimit] = useState(9)
  const [imagesOffset, setImagesOffset] = useState(0)
  const [imagesSearchPagination, setImagesSearchPagination] = useState(0)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [searchText, setSearchText] = useState("")
  const moreArea = useRef();
  const observer = useRef();

  const searchQuery = useSelector(state => state.search.searchQuery);


  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  })

  useEffect(() => {
    if(isLoadingData) return;
    if(observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          setIsLoadingData(true);
          loadMoreData();
        }
      });
    }, { threshold: 0 });

    if(moreArea.current) {
      observer.current.observe(moreArea.current);
    }
  }, [isLoadingData]);
  useEffect(() => {
    setImagesOffset(0);
    setIsLoadingData(true);
    if(searchQuery === '') {
      setImagesSearchPagination(0);
    } else {
      setImagesSearchPagination(imagesSearchPagination + 1);
    }
  }, [searchQuery])
  useEffect(() => {
    loadMoreData();
  }, [imagesSearchPagination])

  const loadMoreData = async () => {
    try {
      let res = null;
      if(searchQuery) {
        res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=${imagesLimit}&offset=${imagesOffset}&lang=en`)
      } else {
        res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${imagesLimit}&offset=${imagesOffset}&lang=en`)
      }

      if(!res) return;

      await res.json()
        .then((resp) => {
          if(imagesOffset > 0) {
            setImages([ ...images , ...resp.data]);
          } else {
            setImages([...resp.data]);
          }
          setImagesOffset(imagesOffset + imagesLimit);
        })
        .finally(() => {
          setIsLoadingData(false)
        })

    } catch(e) {
      console.error(e);
    }
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="wrapper-y" >
          <div className={styles.imagesWrapper}>
            <h1 className={styles.title}>Images page</h1>
            <Search />
            <ImagesGrid images={images} />
            <div ref={moreArea} className={styles.moreArea}></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Images

export async function getStaticProps() {

  // const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchStr}&limit=${limit}&offset=${offset}&rating=g&lang=en`)
  const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=9&lang=en`)
  const imagesData = await res.json()
 
  return {
    props: {
      imagesData,
    },
  }
}