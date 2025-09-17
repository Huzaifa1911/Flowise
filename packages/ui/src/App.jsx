import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
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
    const loginApi = useApi(authApi.login)
    const navigate = useNavigate()

    useEffect(() => {
        if (loginApi.data) {
            store.dispatch(loginSuccess(loginApi.data))
            store.dispatch({ type: SET_DARKMODE, isDarkMode: true })
            navigate(location.state?.path || '/chatflows')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
