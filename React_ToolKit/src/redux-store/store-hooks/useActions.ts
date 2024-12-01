import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { usersAction } from "../store_slice/users-slice"
import { profileAction } from "../store_slice/profile-slice"
import { dialogsAction } from "../store_slice/dialogs-slice"
import { authAction } from "../store_slice/auth-slice"
import { appAction } from "../store_slice/app-slice"
import { chatAction } from "../store_slice/chat-slice"

const allActions = {
    ...usersAction,
    ...profileAction,
    ...dialogsAction,
    ...authAction,
    ...appAction,
    ...chatAction,
}


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}