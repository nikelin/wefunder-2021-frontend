import React, {useEffect, useState} from "react";
import {Button, Container, Divider, Grid, makeStyles, Paper, Theme, Toolbar, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router";
import {useSelector} from "react-redux";
import {AppState, store} from "../store";
import {performFetchPresentation, PresentationState} from "../slices/presentation";
import config from "../config";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        width: "95%",
        margin: "50px auto",
        padding: "20px"
    },
    title: {
        flexGrow: 1
    },
    previewStyle: {
        backgroundColor: '#cfe8fc',
        height: '50vh'
    }
}));

export default function PitchDeckPage(): React.ReactElement {
    const history = useHistory();
    const params = useParams<any>();
    const { id } = params;
    const classes = useStyles();
    const presentationId = id && parseInt(id);
    if (!presentationId) {
        history.push("/");
        return <div/>;
    }

    const [page, setPage] = useState<number>(0);

    const presentation = useSelector<AppState, PresentationState>((state) => state.presentation);

    useEffect(() => {
        store.dispatch(performFetchPresentation({id: presentationId}))
    }, [id])

    const onGoBack = () => history.push("/");

    return <Paper elevation={8} className={classes.paper}>
        <Toolbar>
            <Typography variant={"h5"} className={classes.title}>Presentation viewer</Typography>
            <Button onClick={() => onGoBack()} variant={"outlined"}>Back to list</Button>
        </Toolbar>

        <Divider/>

        <Container maxWidth="sm">
            {!presentation.error && presentation.fetching && <Typography className={classes.previewStyle}>The presentation is being loaded...</Typography>}
            {presentation.error && !presentation.fetching && <Typography className={classes.previewStyle}>Failed to load the presentation data.</Typography>}

            {!presentation.error && !presentation.fetching && presentation.presentation &&
                <Grid container direction={"column"}>
                    <Grid item>
                        <img src={config.api_endpoint + "/presentation/" + presentation.presentation.id.value + "/page/" + presentation.presentation.pages[page].pageNum + "/view"}/>
                    </Grid>

                    <Divider/>

                    <Grid item>
                        <Button onClick={() => page > 0 && setPage(page - 1)}>Prev</Button>

                        {page + 1} / {presentation.presentation.pages.length}

                        <Button onClick={() => presentation.presentation && page < presentation.presentation.pages.length - 1 && setPage(page + 1)}>Next</Button>
                    </Grid>
                </Grid>
            }
        </Container>

    </Paper>
}