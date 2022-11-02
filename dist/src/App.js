import { ThemeProvider } from "@emotion/react"
import theme  from "./theme"
import classes from './App.module.css'


const App = function() {
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.container}>
              ok
            </div>
        </ThemeProvider>
        )
}

export default App