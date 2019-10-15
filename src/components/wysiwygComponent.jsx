import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Card, Button, Divider, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ReplyIcon from '@material-ui/icons/Reply';
import { getQuesAns } from '../services/userService'
import { questionAndAnswer } from '../services/userService';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
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
            id: '',
            dis: false,
            msgArr: [],
            rating: 0,
            editor: false
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

    getQandA = (id) => {
        getQuesAns(id).then(res => {
            console.log("res in qa", res.data[0].createdDate);
            const msg = res.data.map((key, index) => {
                return key.message
            })
            console.log("msg i s", msg);

            this.setState({
                msgArr: res.data
            })
        })
    }

    handleAsk = async () => {
        let ques = convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text;
        await this.setState({
            msg: ques,
            id: this.state.id,
            dis: !this.state.dis
            // editorState=EditorState.createEmpty()
        })
        let data = {
            'message': this.state.msg,
            'notesId': this.state.id
        }
        console.log("data before hitting api", data);
        questionAndAnswer(data).then((res) => {
            console.log("response after hitting question and answer notes api is ", res);
            this.getQandA(this.state.id)
        }).catch(err => {
            console.log("err in hitting question and answer note api ", err);
        })
    }

    handleClose = () => {
        this.props.history.push('/dashboard')
    }

    handleReply = (reply) => {
        this.setState({
            editor: !this.state.editor
        })
        console.log("data in handleReply", reply);

    }

    handleSubmit = () => {

    }

    render() {
        const { editorState } = this.state;
        // console.log("editor state is ", editorState);
        // console.log("raw data", convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text);
        // console.log("raw current inline style data", convertToRaw(this.state.editorState.getCurrentContent()).blocks);
        return (
            <MuiThemeProvider theme={theme}>
                <div className="editor-container">
                    {!this.state.dis ?
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
                        :
                        <div className="editor-contents">
                            <div className="editor-title">
                                <h3>{this.state.title}</h3>
                                <Button onClick={this.handleClose}>Close</Button>
                            </div>
                            <h4>{this.state.desc}</h4>
                            <Divider />
                            <div className="editor-assignment">
                                <p>Question Asked</p>
                                {this.state.msgArr.map((data, index) => {
                                    return (
                                        <p key={index}>{data.message}</p>
                                    )
                                })}
                            </div>
                            <Divider />
                            <div>
                                <div className="editor-assignment">
                                    {this.state.msgArr.map((data, index) => {
                                        return (
                                            <div >
                                                <div>
                                                    <p key={index}>{localStorage.getItem('FirstName')}
                                                        {localStorage.getItem('LastName')}
                                                        {data.createdDate}
                                                    </p>
                                                </div>
                                                {data.message}
                                                <ReplyIcon onClick={() => this.handleReply(data)} />
                                                <ThumbUpIcon />
                                            </div>
                                        )
                                    })}
                                </div>
                                <Divider />

                                {this.state.editor ?
                                    <div>
                                        <Card>
                                            <Editor
                                                editorState={editorState}
                                                placeholder="Type something here..."
                                                wrapperClassName="data-content"
                                                onEditorStateChange={this.onEditorStateChange}
                                            />
                                        </Card>
                                        <Button color="primary" onClick={this.handleSubmit}>Reply</Button>
                                        <Divider />
                                    </div>
                                    : (null)}
                            </div>
                        </div>
                    }
                </div>
            </MuiThemeProvider>
        )
    }
}
export default withRouter(WysiwygComponent)