const PlayAgain = (props : any) => {
    return (<div>
        <div style={{color: props.result == 'won' ? 'green' : 'red'}}>{props.result}</div>
        <button onClick={props.onClick}>Play Again</button>
    </div>)
}
export default PlayAgain