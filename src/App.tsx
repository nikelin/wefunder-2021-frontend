import React from "react"
import { hot } from "react-hot-loader/root"
import { ThemeProvider } from "styled-components"
import { createMuiTheme } from "@material-ui/core/styles"
import {store} from "./store";
import {Switch, Route, BrowserRouter} from "react-router-dom"

import PitchDeckPage from "./pages/PitchDeckPage";
import PitchDecksPage from "./pages/PitchDecksPage";
import NewPitchDeckPage from "./pages/NewPitchDeckPage";

import "fontsource-roboto"
import {Provider} from "react-redux";

const theme = createMuiTheme()

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <>
                        <Switch>
                            <Route exact={true} path="/" render={() => <PitchDecksPage/>} />
                            <Route exact={true} path="/pitch-deck/list" render={() => <PitchDecksPage/>} />
                            <Route exact={true} path="/pitch-deck/new" render={() => <NewPitchDeckPage/>} />
                            <Route exact={true} path="/pitch-deck/:id" render={() => <PitchDeckPage/>} />
                        </Switch>
                    </>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    )
}

export default hot(App)
