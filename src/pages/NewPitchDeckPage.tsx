import React, {useState} from "react";
import {
    Button, Divider,
    FormControl, FormHelperText,
    Grid,
    Input,
    InputLabel,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";
import * as yup from "yup"
import {useFormik} from "formik";
import {uploadPresentation, UploadRequestPayload} from "../api/upload";
import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        width: "85%",
        padding: "30px",
        margin: "30px auto"
    }
}))

export default function NewPitchDeckPage(): React.ReactElement {
    const history = useHistory();
    const classes = useStyles();
    const [file, setFile] = useState<File|null>(null);
    const [error, setError] = useState<string|null>(null);

    const validationSchema = yup.object({
        title: yup
            .string()
            .required("The title must not be empty"),
        author: yup
            .string()
            .required("Please, specify the author of the presentation"),
        description: yup
            .string()
            .required("The description must not be empty")
    })

    const onCancel = () => {
        history.push("/");
    }

    const formik = useFormik({
        enableReinitialize: false,
        initialValues: { author: "", title: "", description: "" },
        validationSchema: validationSchema,
        onSubmit: (values, { setErrors, setValues, setSubmitting, setStatus }) => {
            if (file === null) return;

            console.log("Uploading presentation")

            const requestPayload: UploadRequestPayload = {
                author: values.author,
                title: values.title,
                description: values.description,
                file
            }

            return uploadPresentation(requestPayload)
                .then((result) => {
                    history.push("/pitch-deck/list")
                })
                .catch((error) => {
                    setError(error && error.message)
                    setSubmitting(false)
                })
        }
    })

    const isValid = () => formik.isValid && file !== null;

    return <Paper elevation={3} className={classes.paperStyle}>
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4} direction={"column"}>
                <Grid item>
                    <Typography variant={"h4"}>New Presentation</Typography>
                    <Divider/>
                </Grid>
                <Grid item>
                    <FormControl error={formik.touched.title && Boolean(formik.errors.title)}
                                 fullWidth={true}
                                 variant="outlined">
                        <InputLabel shrink={true} htmlFor="title">Presentation title</InputLabel>
                        <Input
                            id="title"
                            value={formik.values.title}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.title && formik.errors.title &&
                            <FormHelperText>{formik.errors.title}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl error={formik.touched.author && Boolean(formik.errors.author)}
                                 fullWidth
                                 variant="outlined">
                        <InputLabel shrink={true} htmlFor="author">Author</InputLabel>
                        <Input
                            id="author"
                            onBlur={formik.handleBlur}
                            value={formik.values.author}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.author && formik.errors.author &&
                            <FormHelperText>{formik.errors.author}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl error={formik.touched.description && Boolean(formik.errors.description)}
                                 fullWidth
                                 variant="outlined">
                        <InputLabel shrink={true} htmlFor="description">Short description</InputLabel>
                        <Input
                            id="description"
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.description && formik.errors.description &&
                            <FormHelperText>{formik.errors.description}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item>
                    <DropzoneArea
                        filesLimit={1}
                        onDelete={() => setFile(null)}
                        onDrop={(files) => setFile(files[0])}
                        showPreviews={false}
                        showPreviewsInDropzone={false}
                        acceptedFiles={ [
                            "application/pdf",
                            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                            "application/vnd.ms-powerpoint"
                        ]}/>
                </Grid>

                {file !== null &&
                    <Grid item>
                        Uploaded file: <strong>{file.name}</strong> (size {file.size/1000}kb) (<Button onClick={() => setFile(null)} variant={"text"}>delete</Button>)
                    </Grid>
                }

                {error && (
                    <Grid item xs={12}>
                        <Alert variant="outlined" severity="error">
                            Failed to upload the presentation, try again.
                        </Alert>
                    </Grid>
                )}

                <Grid item>
                    <Button type={"submit"} disabled={!isValid() || formik.isSubmitting} variant={"contained"} color={"primary"}>Upload</Button>
                    <Button variant={"contained"} onClick={onCancel} color={"secondary"}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    </Paper>
}