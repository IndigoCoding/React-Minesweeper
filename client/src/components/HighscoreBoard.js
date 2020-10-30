import React from 'react';

const HighscoreBoard = ({mode, highscore}) => {
    return (
        <div id={"highscore-board-" + mode}>
            <table>
                <caption> Highscore mode: {mode}</caption>
                <thead>
                <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {
                    highscore[mode] ? highscore[mode].map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.score}</td>
                                <td>{data.date}</td>
                            </tr>
                        )
                    }) : <tr></tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export default HighscoreBoard;