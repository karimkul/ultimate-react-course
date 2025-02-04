function Progress({ index, numQuestions, poits, maxPossiblePoints, answer }) {
    return (
        <header className="progress">
            <progress
                max={numQuestions}
                value={index + Number(answer !== null)}
            />
            <p>
                Question <strong>{index + 1}</strong> / {numQuestions}
            </p>
            <p>
                <strong>{poits}</strong> / {maxPossiblePoints}
            </p>
        </header>
    );
}

export default Progress;
