// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTimerRunning: false,
      timeLimit: 25,
      timeInSeconds: (25 * 60) % 60,
      timeInMinutes: (25 * 60) / 60,
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const {timeInMinutes, timeInSeconds, isTimerRunning} = this.state
      if (isTimerRunning) {
        if (timeInSeconds > 0) {
          this.setState(prevState => ({
            timeInSeconds: prevState.timeInSeconds - 1,
          }))
        }
        if (timeInSeconds === 0) {
          if (timeInMinutes === 0) {
            clearInterval(this.intervalId)
            this.setState(prevState => ({
              isTimerRunning: !prevState.isTimerRunning,
            }))
          } else {
            this.setState(prevState => ({
              timeInMinutes: prevState.timeInMinutes - 1,
              timeInSeconds: 59,
            }))
          }
        }
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onIncrementTimerValue = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timeLimit: prevState.timeLimit + 1,
        timeInMinutes: prevState.timeInMinutes + 1,
      }))
    }
  }

  onDecrementTimerValue = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timeLimit: prevState.timeLimit - 1,
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  onToggleTimer = () => {
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onResetTimer = () => {
    this.setState({
      timeLimit: 25,
      timeInMinutes: 25,
      timeInSeconds: 0,
      isTimerRunning: false,
    })
  }

  render() {
    const {timeLimit, timeInMinutes, timeInSeconds, isTimerRunning} = this.state

    const minutes = timeInMinutes > 9 ? timeInMinutes : `0${timeInMinutes}`

    const seconds = timeInSeconds > 9 ? timeInSeconds : `0${timeInSeconds}`

    const startAndPauseButtons = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startPauseText = isTimerRunning ? 'Pause' : 'Start'

    const startPauseIcons = isTimerRunning ? 'pause icon' : 'play icon'

    const timerStatus = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="card-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer">
                {minutes}:{seconds}
              </h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-control-container">
            <div className="start-reset-container">
              <button
                type="button"
                className="button"
                onClick={this.onToggleTimer}
              >
                <img
                  src={startAndPauseButtons}
                  alt={startPauseIcons}
                  className="icon"
                />
                {startPauseText}
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
              </button>
              <p className="text">Reset</p>
            </div>
            <p className="timer-limit">Set Timer limit</p>
            <div className="increment-decrement-container">
              <button
                type="button"
                className="plus-minus-button"
                onClick={this.onDecrementTimerValue}
              >
                -
              </button>
              <p className="timer-count-button">{timeLimit}</p>
              <button
                type="button"
                className="plus-minus-button"
                onClick={this.onIncrementTimerValue}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
