import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import { input } from '../styles'
const SCREEN_WITDH = Dimensions.get('window').width;

class FormAddQuestion extends Component {

    static navigationOptions = {
        title: "udacicards"
    }

    state = {
        question: "",
        answer: "",
        error: ''
    }

    handleQuestionChange = (question) => {
        this.setState(() => {
            return {
                question
            }
        })
    }
    handleAnswerChange = (answer) => {
        let checkAns = answer.toLowerCase();
        if (checkAns === 'true' || checkAns === 'false') {
            this.setState(() => {
                return {
                    answer: checkAns,
                    error: ""
                }
            });
        } else {
            this.setState(() => {
                return {
                    error: 'Only True / False ',
                    answer: checkAns,
                }
            })
        }
    }
    handleAdd = () => {
        const title = this.props.navigation.state.params.groupQuestion;
        if (this.state.question && this.state.answer) {
            this.props.dispatch(addQuestion(title, { question: this.state.question, answer: this.state.answer })).then(() => {
                this.props.navigation.goBack()
            })

        } else {
            this.setState({ error: 'Must fill all field' })
        }
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior="padding" enabled>
                <Text style={{ marginBottom: 20, marginTop: 20 , marginLeft: 20}}>You are adding question into : {this.props.navigation.state.params.groupQuestion}</Text>
                <TextInput
                    style={input.field}
                    placeholder="Enter your question"
                    onChangeText={this.handleQuestionChange}
                    multiline
                    value={this.state.question}
                />
                <TextInput
                    style={input.field}
                    placeholder="Enter your answer : true/false"
                    onChangeText={this.handleAnswerChange}
                    value={this.state.answer}
                    autoCapitalize='none'
                />
                {this.state.error.length > 0 && <Text style={styles.txtError}>{this.state.error}</Text>}
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={this.handleAdd}
                >
                    <Text style={{ color: '#fff' }}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    txtInput: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 2,
        width: SCREEN_WITDH,
        height: 40,
        marginBottom: 20
    },
    btnSubmit: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#333',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    txtError: {
        color: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 20
    }
})


export default connect()(FormAddQuestion);