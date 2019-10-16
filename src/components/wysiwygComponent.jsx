import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Card, Button, Divider, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ReplyIcon from '@material-ui/icons/Reply';
import { getQuesAns, like } from '../services/userService'
import { questionAndAnswer } from '../services/userService';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { async } from 'q';
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
            editor: false,
            count: false,
            likes: [],
            msgId: [],
            c: 0,
        }
    }

    componentWillMount() {
        if (this.props.location !== undefined) {
            console.log("data in complete notes form in wy", this.props);
            if (this.props.location.state.length === 3) {
                this.setState({
                    id: this.props.location.state[0],
                    title: this.props.location.state[1],
                    desc: this.props.location.state[2],
                })
            }
            else if (this.props.location.state[3]) {
                console.log("this.proips.", this.props.location);
                this.getQandA(this.props.location.state[0]);
                this.setState({
                    id: this.props.location.state[0],
                    title: this.props.location.state[1],
                    desc: this.props.location.state[2],
                    dis: !this.state.dis
                })
                this.getQandA(this.state.id);
            }
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    handleLike = (id) => {
        let data = {
            'id': id,
            'count': !this.state.count
        }

        like(data).then(res => {
            this.setState({
                count: !this.state.count
            })
            this.getQandA(this.state.id)
            console.log("res after hitting like api is ", res);
        }).catch(err => {
            console.log("err after hitting like api ", err);
        })
    }

    getQandA = (id) => {
        console.log("Yes WYSIWYG comp1", id);
        getQuesAns(id).then(res => {
            console.log("res in qa", res.data[0].createdDate);
            const id = res.data.map((key, index) => {
                return key.id
            })
            this.setState({
                msgId: id
            })
            console.log("msg is", this.state.msgId);
            console.log("Res.did", res.data);

            this.setState({
                msgArr: res.data
            })
            console.log("The message array is ", this.state.msgArr);

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
                                                <div>
                                                    {data.message}
                                                    <ReplyIcon onClick={() => this.handleReply(data)} />
                                                    {data.like.length > 0 ?
                                                        data.like.map(val => {
                                                            return (
                                                                val.like ?
                                                                    <div>
                                                                        <ThumbUpIcon
                                                                            onClick={() => this.handleLike(data.id)}
                                                                            style={{ color: val.like ? '#0000FF' : '' }}
                                                                        />
                                                                        {data.like.length} like
                                                                </div>
                                                                    :
                                                                    <div>
                                                                        <ThumbUpIcon
                                                                            onClick={() => this.handleLike(data.id)}
                                                                            style={{
                                                                                color: !this.state.count ? '' :
                                                                                    '#0000FF'
                                                                            }}
                                                                        />
                                                                        {!this.state.count ? '0 likes' : '1 like'}
                                                                    </div>
                                                            )
                                                        }) :
                                                        <div>
                                                            <ThumbUpIcon
                                                                onClick={() => this.handleLike(data.id)}
                                                                style={{ color: !this.state.count ? '' : '#0000FF' }}
                                                            />
                                                            {!this.state.count ? '0 likes' : '1 like'}
                                                        </div>
                                                    }
                                                </div>
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