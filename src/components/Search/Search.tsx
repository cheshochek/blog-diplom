import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { changePage, changeSearch, getAllPosts, getAllPostsCount } from '../../redux/slices/postsSlice';
import styles from './Search.module.scss';

const Search = () => {
    const { search } = useAppSelector(state => state.posts);
    const [inputValue, setInputValue] = useState(search);
    const theme = useAppSelector(state => state.theme.value);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (search === '') setInputValue('')
    }, [search]);

    const handleChangeInputSearch = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSearch = (event: any) => {
        if (event.code === 'Enter') {
            dispatch(changeSearch(inputValue));
            if (inputValue === '') {
                dispatch(changeSearch(search));
            }
            dispatch(changePage(1));
            navigate('/search');
        }
    };

    return (
        <input
            type='search'
            className={`
        ${styles.search}
        ${theme === 'dark' ? styles.searchDark : null}
        `}
            value={inputValue}
            onKeyDown={handleSearch}
            onChange={handleChangeInputSearch}
        />
    );
};

export default Search;