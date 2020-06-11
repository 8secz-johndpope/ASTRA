import React from 'react';
import { Link } from 'react-router-dom';
import WorkoutIndexItem from '../workouts/workout_index_item'

class WorkoutIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bool: false
        }
        this.updateFilter = this.updateFilter.bind(this)
    }

    componentDidMount() {
        this.props.fetchUsersWorkouts(this.props.currentUser.id).then(
            () => this.setState({bool: true})
        )
    }

    updateFilter(event) {
            this.setState({filter: event.target.value})
    }

    render() {
        // debugger
        if(!this.state.bool) return null;
        const workouts = this.props.workouts;
        const workoutsCU = workouts.filter(workout => workout.user_id === this.props.currentUser.id)
        const latestWorkout = workouts[workouts.length - 1]
        let filteredWorkouts = workouts;
        if(this.state.filter){
            filteredWorkouts = workouts.filter(workout => {
                return workout.title.split(" ").includes(this.state.filter)
            });
        }
        // debugger
        return(
            <div className="work-ind-main">
                This is WorkoutIndex
                <Link to='/workouts/new' className='route-ind-link' >Create New Workout</Link>
                <div>
                    <div>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
                    <label>
                        <div>{workoutsCU.length}</div>
                        Activities
                    </label>
                    <label>
                        Latest Activity
                        <div> 
                            <div>
                                {latestWorkout.title}
                            </div>
                            <div>
                                {latestWorkout.date}
                            </div>
                        </div>
            
                    </label>
                </div>

                <label> 
                    <div>Search</div>
                    <input type="text" onChange={this.updateFilter}/>
                </label>    
        
                <ul className="work-ind-list">
                    <li className="work-ind-line">
                        <div className="work-ind-1">Sport</div>
                        <div className="work-ind-2">Date</div>    
                        <div className="work-ind-3">Title</div> 
                        <div className="work-ind-4">Time</div> 
                        <div className="work-ind-5">Distance</div> 
                        <div className="work-ind-6">Pace</div> 
                        <div className="work-ind-7"></div> 
                        <div className="work-ind-8"></div> 
                    </li>
                {
                filteredWorkouts.map(workout => (
                    <WorkoutIndexItem
                    key={`workout${workout.id}`}
                    workout={workout}
                    currentUser={this.props.currentUser}
                    deleteWorkout={this.props.deleteWorkout}
                />
                    )
                )
                }
          </ul>
            </div>
        )
    }
}

export default WorkoutIndex;