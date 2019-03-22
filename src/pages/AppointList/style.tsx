import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';


export const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
     
    },
    body: {
      fontSize: 14,
      width: '100px',
      wordWrap: 'break-word',
    },
  }))(TableCell);

  export const styles:any = (theme:any) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });