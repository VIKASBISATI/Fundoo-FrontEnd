import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Card, Button, Divider, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { withRouter } from 'react-router-dom';
import {questionAndAnswer} from '../services/userService'
const theme = createMuiTheme({
    overrides: {
        MuiDivider: {
            root: {
                height: "6px"
            }
        }
    }
})
class WysiwygComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            msg: '',
            title: '',
            desc: '',
            id: ''
        }
    }

    componentWillMount() {
        if (this.props.location !== undefined) {
            console.log("data in complete notes form in wy", this.props);
            this.setState({
                id: this.props.location.state[0],
                title: this.props.location.state[1],
                desc: this.props.location.state[2],
            })
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    handleAsk = async () => {
        let ques = convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text;
        await this.setState({
            msg: ques,
            id:this.state.id,
            // editorState=EditorState.createEmpty()
        })
        let data={
            msg:this.state.msg,
            id:this.state.id
        }
        console.log("data before hitting api",data);
        
        questionAndAnswer(data).then((res)=>{
            console.log("response after hitting question and answer notes api is ",res);
        }).catch(err=>{
            console.log("err in hitting question and answer note api ",err); 
        })
    }

    handleClose = () => {
        this.props.history.push('/dashboard')
    }

    render() {
        const { editorState } = this.state;
        // console.log("editor state is ", editorState);
        console.log("raw data", convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text);
        return (
            <MuiThemeProvider theme={theme}>
                <div className="editor-container">
                    <div className="editor-contents">
                        <div className="editor-title">
                            <h3>{this.state.title}</h3>
                            <Button onClick={this.handleClose}>Close</Button>
                        </div>
                        <h4>{this.state.desc}</h4>
                        <Divider />
                        <p>Ask a Question</p>
                        <Divider />
                        <Card>
                            <Editor
                                editorState={editorState}
                                placeholder="Type something here..."
                                wrapperClassName="data-content"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </Card>
                        <div className="editor-button">
                            <Button color="primary" onClick={this.handleAsk}>Ask</Button>
                            <Divider />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
export default withRouter(WysiwygComponent)