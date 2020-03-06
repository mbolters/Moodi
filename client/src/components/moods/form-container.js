import React, {Component} from 'react';
import MorningMood from '../moods/create-morning-mood';
import EveningMood from '../moods/create-evening-mood';



class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),   
            morning: null,
            evening: null
        }
    }
    
    componentDidMount() {
        let todaysDate = new Date();
        let timeNow = todaysDate.getHours(); 
        
        

        if (timeNow <= 12) {
            this.setState({
                morning: true
            })
        } else if (timeNow > 12) {
            this.setState({
                evening: true
            })
        }
        
    }

    render() {
        
        const renderCorrectTimeForm = () => {
            if (this.state.morning) {
                return (
                    <div><MorningMood/></div>
                )
            } else if (this.state.evening) {
                return(<div><EveningMood/></div>)
            }
        }

        return (
            <div>
                {renderCorrectTimeForm()}
            </div>
        )
    }
    
}

export default FormContainer;