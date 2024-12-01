import React, { useEffect } from "react";
import userPhoto from '../../images/KOUAtGvT1GU.jpg';
import styles from './Users.module.css';
import cn from 'classnames'
import { NavLink, Navigate, useSearchParams } from "react-router-dom";
import UserSearchForm from "./UserSearchForm.tsx"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import queryString from 'querystring'
import Preloader from "../Preloader/Preloader.tsx";
import { ThunkType } from "../../redux/profile-reducer.ts";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType, TDispatch } from "../../redux/redux-store.ts";
import { useTypedSelectors } from "../../redux-store/store-hooks/useTypedSelectors.ts";
import {
    follow,
    setCurrentFilter,
    setCurrentPage,
    setCurrentUsersCount,
    setUsers,
    unfollow,
} from "../../redux-store/store-slice/users-slice.ts";
import { useFollowAPIMutation, useLazyGetUsersAPIQuery, useUnfollowAPIMutation } from "../../redux-store/store-api/user-api.ts";
import { FilterType } from "../../redux-store/store-slice/Type-Slice.ts";




let Users: React.FC = () => {
    const dispatch = useDispatch<TDispatch>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();



    const totalUsersCount = useTypedSelectors((state) => state.users.totalUsersCount)
    const pageSize = useTypedSelectors((state) => state.users.pageSize)
    const currentPage = useTypedSelectors((state) => state.users.currentPage)
    const filter = useTypedSelectors((state) => state.users.filter)
    const users = useTypedSelectors((state) => state.users.users)
    const followingInProgress = useTypedSelectors((state) => state.users.followingInProgress)
    // const isFetching = useTypedSelectors((state) => state.users.isFetching)



    const [GetUsersAPI, { isLoading: GetUsersisLoading, isSuccess: GetUsersAPIisSuccess }] = useLazyGetUsersAPIQuery()

    const GetUsers = async (currentPage: number, pageSize: number, filter: FilterType) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(setCurrentFilter(filter))
        const { term, friend } = filter
        GetUsersAPI({ currentPage, pageSize, term, friend })
            .unwrap()
            .then(res => {
                dispatch(setUsers(res.items))
                dispatch(setCurrentUsersCount(res.totalCount))
            })
            .catch((error) => console.log(error));
    };
    const [followAPI, { isLoading: followAPIisLoading, isSuccess: followAPIisSuccess }] = useFollowAPIMutation()
    //TODO наладить работу loading
    const Follow = async (userId: number) => {

        followAPI(userId)
            .unwrap()
            .then(res => {
                if (res.status === 200) {
                    dispatch(follow(userId));
                }
            })
            .catch((error) => console.log(error));
    };
    const [unfollowAPI, { isLoading: unfollowAPIisLoading, isSuccess: unfollowAPIisSuccess }] = useUnfollowAPIMutation()
    const UnFollow = async (userId: number) => {

        unfollowAPI(userId)
            .unwrap()
            .then(res => {
                if (res.status === 200) {
                    dispatch(unfollow(userId));
                }
            })
            .catch((error) => console.log(error));
    };





    useEffect(() => {
        const parsed = Object.fromEntries(new URLSearchParams(searchParams.toString())) as { term: string, page: string, friend: string }
        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
        if (!!parsed.friend)
            switch (parsed.friend) {
                case 'null':
                    actualFilter = { ...actualFilter, friend: null }
                    break
                case 'true':
                    actualFilter = { ...actualFilter, friend: true }
                    break
                default:
                    actualFilter = { ...actualFilter, friend: false }
            }
        // dispatch(getUsersThunkCreator({ actualPage, pageSize, actualFilter }))
        console.log('1')
        GetUsers( actualPage, pageSize, actualFilter )
    }, [])

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



    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: number[] = [];
    

    for (let i: number = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = currentPage;
    let curPF = ((curP - 4) < 0) ? 0 : curP - 5;
    let curPL = curP + 4;
    let slicedPages = pages.slice(curPF, curPL);


    return <div className={styles.global__wrapper}>

        {/* <UserSearchForm GetUsers={GetUsers} /> */}

        <div className={styles.mainPage}>
            <div className={styles.page}>
                {slicedPages.map(p => {
                    return <span key={p}
                        className={cn({ [styles.selectedPage]: currentPage === p })}
                        onClick={(e) => { GetUsers( p, pageSize, filter ) }}>{p}</span>
                })}
            </div>
        </div>


        {/* {GetUsersisLoading ? <div className={styles.preloader}><Preloader /></div> : null} */}


        <div className={styles.user__items__wrapper__global}>
            {
                users.map(u => <div key={u.id}>
                    <div className={styles.user__items__wrapper}>


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

                        <div >
                            {u.followed
                                ? <button className={styles.btn} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    UnFollow(u.id);
                                }}>Unfollow</button>
                                : <button className={styles.btn} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                    Follow(u.id);
                                }}>Follow</button>}
                        </div>


                    </div>

                </div>)
            }
        </div>
    </div >
}

export default Users;