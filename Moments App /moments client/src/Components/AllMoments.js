import React, { Component } from "react";
import { Table, TableHead, TableContainer, TableRow, TableCell, Paper, TableBody, Container, Avatar, Chip, ListItem, Button } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

class AllMoments extends Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: 0, moments: [] };
    this.handleResize = this.handleResize.bind(this);
  }

  async componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);

    try {
      const res = await axios.get("/getMoments");
      this.setState({ moments: res.data.moments });
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  createData(sno,photoUrl, title, tags,key) {
    return {
      sno,
      name: <Avatar alt='Remy Sharp' src={`http://localhost:8000/${photoUrl}`} />,
      title,
      tags: (
        <>
          {tags.map((data) => {
            return (
              <ListItem key={data}>
                <Chip size='small' label={data} />
              </ListItem>
            );
          })}
        </>
      ),
      key
    };
  }

  deleteMoment = async(moment) => {
    try {
      await axios.post('/delete_moment', {_id : moment.key})
      const temp = this.state.moments.filter(mom =>  mom._id !== moment.key)
      this.setState({moments:temp})
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { moments } = this.state;

    const rows = moments.map((moment,index) => this.createData(index + 1,moment.photoUrl, moment.title, moment.tags, moment._id))

    return (
      <Container style={window.screen.width < 600 ? {} : { marginLeft: 240 }}>
        {moments && moments.length > 0 ?  <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.sno}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.tags}</TableCell>
                  <TableCell>
                    <Button onClick={() => this.deleteMoment(row)} variant='outlined' startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : <Paper style={{padding : '20px'}}> 
          <Button variant="contained" onClick={() => this.props.history.push('/new_moment')}>Add Moment</Button></Paper>}
      </Container>
    );
  }
}

export default AllMoments;
