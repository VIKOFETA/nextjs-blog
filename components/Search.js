import {useRef} from 'react'
import styles from '../styles/Search.module.css'

import { setSearchQuery } from '../store/searchSlice'
import { useDispatch } from 'react-redux';

export default function Search() {
  const searchInput = useRef();
  const callAction = useDispatch();

  const setSearch = () => {
    if(!searchInput.current) return;
    callAction(setSearchQuery(searchInput.current.value));
  }

  return (
    <div className={styles.search}>
      <input className={styles.searchInput} ref={searchInput} type="search" placeholder="Search gif" />
      <button className={styles.searchButton} onClick={setSearch} type="button">Search</button>
    </div>
  )
}
