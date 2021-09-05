import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Transactions(props){
    const classes = useStyles();
    const [authorName ,setName] = useState('');

    function onCreateAuthor(e){
        e.preventDefault();
        const postAuth = {
            authorName
        }

        axios
            .post(
            'http://localhost:3001/demoApi/author',
                postAuth,
            ).then(response => {
                console.log(response);
        } );
    }




    return(
        <div>
            <h3> Contacts is cool! </h3>
            <form className={classes.form}  onSubmit={onCreateAuthor} noValidate >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="NAME"
                    label="Name"
                    type="name"
                    id="name"
                    value = {authorName}
                    onInput={ e => setName(e.target.value)}
                    autoFocus
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create Author
                </Button>
            </form>
        </div>

    )
};

//export default Transactions;