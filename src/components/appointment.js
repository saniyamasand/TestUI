import React from "react";
import{Paper, Card, Grid} from '@material-ui/core';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const currentDate = '2018-11-01';
const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meera Blouse' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Dr Kencha Daughter Ghagra' },
    { startDate: '2018-11-01T15:00', endDate: '2018-11-01T17:30', title: 'Lily Top' },
];

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding : theme.spacing(2)
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

export default function Appointment(){
    const classes = useStyles();
    return(
           <Paper>
               <Grid container spacing={3} justify="center" direction="row" alignItems="center">
                   <Grid item   xs={4}  align = "center">
                       <Card align = "center" justify={"center"} direction={"column"}  >
                           <Typography component="h1" variant="h5" align = "center" justify={"center"} direction={"column"} >
                               Create Appointment
                           </Typography>
                           <form className={classes.form} noValidate align={"center"}>
                               <TextField
                                   variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   id="StartDate"
                                   label="Start Date"
                                   name="Start Date"
                                   autoFocus
                               />
                               <TextField
                                   variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   name="End Date"
                                   label="End Date"
                                   type="End Date"
                                   id="End Date"
                                   autoFocus
                               />

                               <TextField
                                   variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   id="Client Name"
                                   label="Client Name"
                                   name="Client Name"
                                   autoFocus
                               />
                               <TextField
                                   variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   name="Description"
                                   label="Description"
                                   type="Description"
                                   id="Description"
                               />

                               <Button
                                   type="submit"
                                   fullWidth
                                   variant="contained"
                                   color="#000000"
                                   className={classes.submit}
                               >
                                   Create Appointment
                               </Button>
                           </form>
                       </Card>
                   </Grid>
                   <Grid item xs={6}>
                       <Scheduler
                           data = {schedulerData}
                       >
                           <ViewState
                               currentDate={currentDate}
                           />
                           <DayView
                               startDayHour = {9}
                               endDayHour = {18}
                           />
                           <Appointments/>
                       </Scheduler>
                   </Grid>


               </Grid>
           </Paper>

        )
}

/*export default Appointment;*/