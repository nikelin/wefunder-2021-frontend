import {
    Avatar, Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia, Divider,
    Grid,
    makeStyles, Paper,
    Theme, Toolbar,
    Typography
} from "@material-ui/core";
import React, {useEffect} from "react";

import { red } from '@material-ui/core/colors';

import {AppState, store} from "../store";
import {useSelector} from "react-redux";
import {performFetchPresentationsList, PresentationsState} from "../slices/presentations";
import {Id, Presentation, PresentationData} from "../api/entities";
import config from "../config";
import {useHistory} from "react-router";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        margin: "50px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    uploadButton: {
        width: "40%"
    },
    card: {
        minWidth: "250px"
    },
    paper: {
        width: "95%"
    },
    title: {
        flexGrow: 1
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function PitchDecksPage(): React.ReactElement {
    const classes = useStyles();
    const history = useHistory();
    const presentations = useSelector<AppState, PresentationsState>((state) => state.presentations);

    useEffect(() => {
        store.dispatch(performFetchPresentationsList())
    }, [])

    const onPresentationOpen = (id: Id<Presentation>) => {
        history.push("/pitch-deck/" + id.value)
    }

    const renderItem = (presentation: PresentationData) => {
        return <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>{presentation.presentation.author.substring(0, 1)}</Avatar>
                }
                title={presentation.presentation.title}
                subheader={moment(presentation.presentation.createdAt).startOf('hour').fromNow()}
            />
            <CardMedia
                className={classes.media}
                image={config.api_endpoint + "/presentation/preview/" + presentation.id.value}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {presentation.presentation.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button onClick={() => onPresentationOpen(presentation.id)}>Open</Button>
            </CardActions>
        </Card>
    }

    const onNewPitchDeck = () => {
        history.push("/pitch-deck/new");
    }

    return <Paper elevation={8} className={classes.root}>
        <Toolbar>
            <Typography variant={"h5"} className={classes.title}>Presentations</Typography>
            <Button onClick={() => onNewPitchDeck()} variant={"outlined"}>New Pitch Deck</Button>
        </Toolbar>

        <Divider/>

        <Grid container spacing={5} justify={"center"}>
            {!presentations.error && presentations.fetching && <Grid item><Typography>Fetching the presentations list...</Typography></Grid>}
            {presentations.error && !presentations.fetching && <Grid item><Typography>Failed to fetch the presentations list.</Typography></Grid>}

            {!presentations.error && !presentations.fetching && presentations.list.length === 0 &&
                <Grid item xs={4}><Typography>Nothing here as yet.</Typography></Grid>
            }

            {presentations.list.map((presentation, key) =>
                <Grid key={presentation.id.value} item xs={2}>
                    {renderItem(presentation)}
                </Grid>
            )}
        </Grid>
    </Paper>
}