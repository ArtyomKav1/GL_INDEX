import React, { useEffect, useRef } from "react";
import styles from './Users.module.scss';
import cn from 'classnames'
import { NavLink, Navigate, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import queryString from 'querystring'
import { useAppDispatch, useAppSelector } from "src/app/hooks/hooks";
import {
    followAsync, getUsersAsync, onPageChangedAsync, selectCurrentPage,
    selectFilter, selectFollowingInProgress, selectIsFetching, selectPageSize,
    selectTotalUsersCount, selectUsers, unfollowAsync
} from "src/app/slice/userSlice";
// import queryString from "query-string"; 
//TODO удалить из node modules
import { FilterType } from "src/app/slice/TypeSlice";
import UserSearchForm from "./UserSearchForm";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import "../../index.css"

type PropsType = {
    // currentPage: number
    // followingInProgress: Array<number>
    // isAuth: boolean
    // isFetching: boolean
    // pageSize: number
    // totalUsersCount: number
    // users: Array<UsersType>
    // onPageChanged: (pageNumber: number) => void
    // unfollow: (userId: number) => void
    // follow: (userId: number) => void
    // onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userPhoto = "https://sneg.top/uploads/posts/2023-06/1687990863_sneg-top-p-avatarka-siluet-muzhchini-vkontakte-55.png"
    const totalUsersCount = useAppSelector(selectTotalUsersCount)
    const pageSize = useAppSelector(selectPageSize)
    const currentPage = useAppSelector(selectCurrentPage)
    const filter = useAppSelector(selectFilter)
    const users = useAppSelector(selectUsers)
    const followingInProgress = useAppSelector(selectFollowingInProgress)
    const isFetching = useAppSelector(selectIsFetching)



    const onPageChanged = (pageNumber: number) => {
        dispatch(onPageChangedAsync({ pageNumber, pageSize, filter }))
    }
    const onFilterChanged = (filter: FilterType) => {
        let pageNumber = 1
        dispatch(getUsersAsync({ pageNumber, pageSize, filter }))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowAsync(userId))
    }
    const follow = (userId: number) => {
        dispatch(followAsync(userId))
    }
    // const resetFiletr = () => {
    //     dispatch(resetFilter)
    // }




    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: number[] = [];
    for (let i: number = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = currentPage;
    let curPF = ((curP - 4) <= 0) ? 0 : curP - 5;
    let curPL = curP + 4;
    let slicedPages = pages.slice(curPF, curPL);







    useEffect(() => {
        dispatch(getUsersAsync({ currentPage, pageSize, filter }))
    }, [])
    const [searchParams] = useSearchParams();
    // useEffect(() => {

    //     const parsed = Object.fromEntries(new URLSearchParams(searchParams.toString())) as { term: string, page: string, friend: string }
    //     // const parsed = Object.fromEntries(searchParams)

    //     let actualPage = currentPage
    //     let actualFilter = filter

    //     if (!!parsed.page) actualPage = Number(parsed.page)
    //     if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
    //     if (!!parsed.friend)
    //         switch (parsed.friend) {
    //             case 'null':
    //                 actualFilter = { ...actualFilter, friend: null }
    //                 break
    //             case 'true':
    //                 actualFilter = { ...actualFilter, friend: true }
    //                 break
    //             default:
    //                 actualFilter = { ...actualFilter, friend: false }
    //         }
    //         debugger
    //     dispatch(getUsersAsync({actualPage, pageSize, actualFilter}))

    // }, [])

    useEffect(() => {
        const query: any = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);

    const preloaderRef = useRef(null);
    const mainRef = useRef(null);


    return <>


        <div className={styles.global__wrapper}>


            <UserSearchForm onFilterChanged={onFilterChanged} />


            <div className={styles.mainPage}>
                <div className={styles.page}>
                    {slicedPages.map(p => {
                        return <span key={p}
                            className={cn({ [styles.selectedPage]: currentPage === p })}
                            onClick={(e) => { onPageChanged(p); }}>{p}</span>
                    })}
                </div>
            </div>


            <div className={styles.user__items__wrapper__global}>

                {
                    isFetching

                        ? <CSSTransition
                            nodeRef={preloaderRef}
                            in={isFetching}
                            timeout={2200}
                            classNames="preloader">
                            <div ref={preloaderRef} className={styles.preloader}></div>
                        </CSSTransition>

                        : <CSSTransition
                            nodeRef={mainRef}
                            in={isFetching}
                            timeout={3200}
                            classNames="main">
                            <div ref={mainRef} className={styles.user__items__wrapper}>{

                                users.map(u => <div className={styles.user__items} key={u.id}>


                                    <div className={styles.user__items__left__wrapper}>
                                        <div>
                                            <NavLink to={'/profile/' + u.id}>
                                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                                            </NavLink>
                                        </div>

                                        <div className={styles.user__info}>
                                            <span>
                                                <span>
                                                    <div>Name:{u.name}</div>
                                                    <div>Status:{u.status ? u.status : "  -----"}</div>
                                                </span>
                                            </span>
                                        </div>

                                    </div>

                                    <div className={styles.user__items__right__wrapper}>
                                        {u.followed
                                            ? <button className={styles.btn} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                                unfollow(u.id);
                                            }}>Unfollow</button>
                                            : <button className={styles.btn} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                                follow(u.id);
                                            }}>Follow</button>}
                                    </div>







                                </div>)
                            }</div>
                        </CSSTransition>
                }


            </div>


        </div >


    </>
}

export default Users;



// <SwitchTransition mode = {"out-in"}>
// {
//     isFetching

//         ? <CSSTransition
//             nodeRef={preloaderRef}
//             in={isFetching}
//             timeout={2200}
//             classNames="preloader">
//             <div ref={preloaderRef} className={styles.preloader}></div>
//         </CSSTransition>

//         : <CSSTransition
//             nodeRef={mainRef}
//             in={isFetching}
//             timeout={3200}
//             classNames="main">
//             <div ref={mainRef} className={styles.user__items__wrapper}>{

//                 users.map(u => <div className={styles.user__items} key={u.id}>


//                     <div className={styles.user__items__left__wrapper}>
//                         <div>
//                             <NavLink to={'/profile/' + u.id}>
//                                 <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
//                             </NavLink>
//                         </div>

//                         <div className={styles.user__info}>
//                             <span>
//                                 <span>
//                                     <div>Name:{u.name}</div>
//                                     <div>Status:{u.status ? u.status : "  -----"}</div>
//                                 </span>
//                             </span>
//                         </div>

//                     </div>

//                     <div className={styles.user__items__right__wrapper}>
//                         {u.followed
//                             ? <button className={styles.btn} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
//                                 unfollow(u.id);
//                             }}>Unfollow</button>
//                             : <button className={styles.btn} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
//                                 follow(u.id);
//                             }}>Follow</button>}
//                     </div>







//                 </div>)
//             }</div>
//         </CSSTransition>
// }
// </SwitchTransition>