import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

// routing
import Routes from '@/routes'

// defaultTheme
import themes from '@/themes'

// project imports
import NavigationScroll from '@/layout/NavigationScroll'
import authApi from '@/api/auth'
import useApi from './hooks/useApi'
import { loginSuccess } from './store/reducers/authSlice'
import { store } from './store'
import { SET_DARKMODE } from './store/actions'

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state?.customization)
    const user = useSelector((state) => state?.auth?.user)
    const loginApi = useApi(authApi.login)

    useEffect(() => {
        if (user) return
        const doLogin = async () => {
            await loginApi.request({ email: 'huzaifa.arshad@emumba.com', password: 'Emumba@123' })
        }

        doLogin()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        if (loginApi.data) {
            store.dispatch(loginSuccess(loginApi.data))
            store.dispatch({ type: SET_DARKMODE, isDarkMode: true })
        }
    }, [loginApi.data])

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App
