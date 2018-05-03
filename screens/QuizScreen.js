import React ,{Component} from 'react';
import {Text , View , StyleSheet ,TouchableOpacity} from 'react-native';
import {Ionicons  , Entypo} from '@expo/vector-icons';
import {connect} from 'react-redux';

import { updateProgressUser ,updateCorrect} from '../actions';
import { btn } from '../styles/index'



class QuizScreen extends Component {
    static navigationOptions = ({navigation})=>{
        const {params} = navigation.state;
        return {
            title: "Quiz",
            
        }
    }
    constructor(props){
        super(props);
        this.state = {
            currentQuestion: 0,
            Questions: [],
            submitAnswer: false,
            correct: false,
            numberCorrect : 0,
            title: "",
            showAnswer: false
        }
    }
    componentDidMount(){
        const {params} = this.props.navigation.state;
        if(params){
            this.setState({Questions: params.questions , title: params.title})
        }
    }

    handleAnswer = (ans)=>{
        const {currentQuestion , Questions} = this.state
        if(ans === Questions[currentQuestion].answer){
            this.setState((prevState)=>{
                return {
                    submitAnswer: true,
                    correct: true,
                    numberCorrect: prevState.numberCorrect + 1,
                    showAnswer:true
                }
            })
            
        }else{
            this.setState(()=>{
                return {
                    submitAnswer: true,
                    showAnswer:true
                }
            })
        }
    }

    handleNextQuestion = ()=>{
        this.setState((prevState)=>{
            return {currentQuestion: prevState.currentQuestion + 1 , submitAnswer: false , correct:false ,showAnswer:false}
        })
    }

    handleBackQuestion = ()=>{
        this.setState((prevState)=>{
            return {
                showAnswer:false , 
                submitAnswer:false,
            }
        })
    }

    handleShowAnswer = ()=>{
        this.setState((prevState)=>{
            return {showAnswer: true}
        })
    }
    
    handleRestartQuiz = ()=>{
        this.setState((prevState)=>{
            return {
                currentQuestion: 0,
                submitAnswer: false,
                correct: false,
                numberCorrect : 0,
                showAnswer: false
            }
        })
    }
    handleComplete = ()=>{
      const {title , numberCorrect} = this.state;
      this.props.dispatch(updateCorrect(title , numberCorrect)).then(()=>{
        this.props.navigation.goBack()
      })
    }

    displayAnswerQuestion = ()=>{
        let {submitAnswer , showAnswer , correct ,Questions ,currentQuestion} = this.state;
        if(!submitAnswer && showAnswer){
            return (
                <View style={{flexDirection: 'row' , justifyContent:'center' , alignItems:'center'}}>
                    <Text>Anwser is : </Text>
                    <Text style={{fontSize: 25 , marginLeft: 10 , color:'#27ae60'}}>{Questions[currentQuestion].answer}</Text>
                </View>
            )
        }else if(submitAnswer){
            if(correct){
                return <View style={styles.result}><Ionicons name="ios-checkmark-circle-outline" size={50} color="green"/><Text style={{marginTop: 20}}>Correct Answer</Text></View>
            }else{
                return <View style={styles.result}><Entypo name="circle-with-cross" size={50} color="red"/><Text style={{marginTop: 20}}>Wrong Answer</Text></View>
            } 
        }else if(!submitAnswer && !showAnswer){
            return <Text style={{textAlign:'center'}}>{this.state.Questions[currentQuestion].question}</Text>
        }
    }

    renderButtonAnswer = ()=>{
        let {submitAnswer , showAnswer} = this.state;
        if(!submitAnswer && !showAnswer){
            return (
            <View style={styles.groupButton}>
                <TouchableOpacity 
                    style={btn.btnCorrect}
                    onPress={()=>{ this.handleAnswer('true')}}
                >
                    <Text style={{color:'#fff'}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={btn.btnIncorrect}
                    onPress={()=>{ this.handleAnswer('false')}}
                >
                    <Text style={{color:'#fff'}}>Incorrect</Text>
                </TouchableOpacity>
            </View>
            )
        }
    }

    renderButtonHelper = ()=>{
        let {submitAnswer , showAnswer , correct ,Questions ,currentQuestion} = this.state;
        
        if (showAnswer){
            if((currentQuestion + 1) === (Questions.length) && submitAnswer){
                return (
                    <View style={styles.groupButton}>
                    <TouchableOpacity
                        style={btn.btnPrimary}
                        onPress={this.handleRestartQuiz}
                    >
                        <Text style={{color: '#fff'}}>Restart Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={btn.btnPrimary}
                        onPress={this.handleComplete}
                    >
                        <Text style={{color: '#fff'}}>Done</Text>
                    </TouchableOpacity>
                    </View>
                    
                        )
            }else if((currentQuestion + 1) === (Questions.length) && !submitAnswer){
                return (
                    <View style={styles.groupButton}>
                <TouchableOpacity
                    style={!correct ? btn.btnPrimary : btn.btnDisable}
                    onPress={this.handleBackQuestion}
                    disabled={correct}
                >
                    <Text style={{color: '#fff'}}>Go Back Question</Text>
                             
                </TouchableOpacity>
                
                </View>
                )
            }
            return(
                <View style={styles.groupButton}>
                <TouchableOpacity
                    style={!correct ? btn.btnPrimary : btn.btnDisable}
                    onPress={this.handleBackQuestion}
                    disabled={correct}
                >
                    <Text style={{color: '#fff'}}>Go Back Question</Text>
                             
                </TouchableOpacity>
                <TouchableOpacity
                    style={btn.btnPrimary}
                    onPress={this.handleNextQuestion}
                >
                    <Text style={{color: '#fff'}}>Next Question</Text>
                             
                </TouchableOpacity>
                </View>
            )
        }else if(!showAnswer){
            
            return (
                <TouchableOpacity
                    style={btn.btnPrimary}
                    onPress={this.handleShowAnswer}
                >
                        <Text style={{color: '#fff'}}>Show Answer</Text>
                </TouchableOpacity>
            )
        }
    }
    render(){
        const {currentQuestion , Questions , showAnswer ,submitAnswer} = this.state;
        return (
            <View style={styles.container}>
            {Questions.length > 0 && (
                <View style={[styles.container,{justifyContent:'space-around'}]}>
                <View style={{flex:1 , paddingTop: 20 , paddingLeft: 10}}>
                    <Text>Question : {`${this.state.currentQuestion + 1} / ${this.state.Questions.length}`}</Text>
                    <Text style={{marginTop:20}}>Correct : {`${this.state.numberCorrect}`}</Text>
                </View>
                <View style={{flex:1.5 , alignItems:'center'}}>
                    {this.displayAnswerQuestion()}
                    {this.renderButtonAnswer()}
                </View>
                <View style={{flex:1 , alignItems:'center'}}>
                    {this.renderButtonHelper()}
                </View>
                
                </View>
            )}
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    groupButton:{
        flexDirection: 'row',
    },
    btn:{
        width: 150,
        paddingTop: 10,
        paddingBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#f7f7f7',
        borderWidth: 1,
        borderRadius: 5,
        margin: 20
    },
    result:{
      justifyContent:'space-between',
      alignItems:'center'
    }
})

const mapStateToProps = (state)=>{
    return {
        User: state.User
    }
}

export default connect(mapStateToProps)(QuizScreen);

