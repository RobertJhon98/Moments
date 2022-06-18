import React, { Component } from "react";
import { Container, Paper, TextField, InputLabel, Select, MenuItem, Chip, Box, Stack, Button, Typography, Grid } from "@mui/material";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

class NewMoment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      tags: [],
      tagText: "",

      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      image: null,
      imageName: null,
      titleError: false,
      titleLengthError: false,
      imageError: false,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleChange = (event) => {
    const {
      target: { value },
    } = event;

    this.setState({ tags: typeof value === "string" ? value.split(",") : value });
  };

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  // onImageChange = (event) => {
  //   this.setState({ imageError: false });
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     this.setState({
  //       // image: URL.createObjectURL(img),
  //       image: img,
  //       imageName: img.name,
  //     });
  //   }
  // };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let error = false;
      if (!this.state.title) {
        this.setState({ titleError: true });
        error = true;
      } else if (this.state.title && this.state.title.length > 100) {
        this.setState({ titleLengthError: true });
        error = true;
      }
      if (!this.state.imageName) {
        this.setState({ imageError: true });
        error = true;
      }

      const formData = new FormData();
      formData.append("photo", this.state.image);
      formData.append("title", this.state.title);
      formData.append("tags", JSON.stringify(this.state.tags));

      if (!error) {
        await axios.post("/newMoment",formData);
        this.props.history.push("/moments");
      }
    } catch (error) {}
  };

  handlePhoto = (e) => {
    this.setState({ image: e.target.files[0], imageName: e.target.files[0].name, imageError: false });
  };

  addtag = () => {
    let { tags, tagText } = this.state;
    tagText = tagText.replace(/\s/g, "_");
    tags.push(tagText)
    this.setState({ tags, tagText: "" });
  };

  handleTagDelete = (tag) => {
    const { tags } = this.state;
    const index = [...tags].indexOf(tag);
    if (index > -1) {
      tags.splice(index, 1);
      this.setState({ tags });
    }
  };

  render() {
    const { tags, titleLengthError } = this.state;
    return (
      <Container style={window.screen.width < 600 ? {} : { marginLeft: 240 }}>
        <Paper>
          <div style={{ padding: "20px 40px" }}>
            <Box component='form' onSubmit={this.handleSubmit} sx={{ mt: 3 }} encType='multipart/form-data'>
              <TextField
                id='title'
                name='title'
                label='Title'
                variant='outlined'
                fullWidth
                error={this.state.titleError || titleLengthError}
                helperText={this.state.titleError ? "Please enter title" : titleLengthError ? "Title must be less than 100 characters" : ""}
                onChange={(e) => this.setState({ titleError: false, titleLengthError: false, title: e.target.value })}
              />
              <br />
              <br />
              <InputLabel style={{ textAlign: "left" }} id='demo-multiple-chip-label'>
                Tags
              </InputLabel>
              <Select
                labelId='demo-multiple-chip-label'
                id='demo-multiple-chip'
                multiple
                value={tags}
                label='Age'
                onChange={this.handleChange}
                // input={<OutlinedInput id='select-multiple-chip' label='Age' />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} onDelete={() => this.handleTagDelete(value)} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                inputProps={{ readOnly: true }}
                fullWidth
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <br /> <br />
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {" "}
                    <TextField
                      id='newtag'
                      name='newtag'
                      label='New tag'
                      variant='outlined'
                      fullWidth
                      value={this.state.tagText}
                      // error={this.state.titleError || titleLengthError}
                      // helperText={this.state.titleError ? "Please enter title" : titleLengthError ? "Title must be less than 100 characters" : ""}
                      onChange={(e) => this.setState({ tagText: e.target.value })}
                    />
                    {this.state.tags.includes(this.state.tagText) && (
                      <Typography style={{ color: "red", textAlign: "left" }}>Tag already exists</Typography>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant='outlined'
                      disabled={!this.state.tagText.trim() || this.state.tags.includes(this.state.tagText)}
                      onClick={() => this.addtag()} /* sx={{ mt: 3, mb: 2 }} */
                    >
                      Add Tag
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {/* <input type='file' accept='.png, .jpg, .jpeg' name='photo' onChange={this.handlePhoto} /> */}
              <br />
              <br />
              <Stack direction='row' alignItems='center' spacing={2}>
                <label htmlFor='contained-button-file'>
                  {/* {this.state.imageName && <Typography>{this.state.imageName}</Typography>} */}
                  {/* <Button variant='contained' component='span' style={{ float: "left" }}>
                    Upload Photo
                  </Button> */}

                  <input type='file' accept='.png, .jpg, .jpeg' name='photo' onChange={this.handlePhoto} />
                  {this.state.imageError && <Typography style={{ color: "red", textAlign: "left" }}>Please upload a photo</Typography>}
                </label>
              </Stack>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                Create
              </Button>
            </Box>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default NewMoment;
